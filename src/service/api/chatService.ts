import { collection, doc, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

export const subscribeToChatMessages = (
    projectId: string,
    callback: (messages: any[]) => void
) => {
    try {
        const messagesRef = collection(doc(db, "projects", projectId), "chat");
        const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
            const messages = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            callback(messages);
        });

        return unsubscribe;
    } catch (error) {
        console.error("Error subscribing to chat messages:", error);
        throw new Error("Failed to subscribe to messages");
    }
};

export const sendMessage = async (
    projectId: string,
    userId: string,
    message: string
) => {
    try {
        const newMessage = {
            senderId: userId,
            text: message,
            timestamp: new Date().toISOString(),
        };
        const messagesRef = collection(doc(db, "projects", projectId), "chat");
        await addDoc(messagesRef, newMessage);
    } catch (error) {
        console.error("Error sending message:", error);
        throw new Error("Failed to send message");
    }
};
