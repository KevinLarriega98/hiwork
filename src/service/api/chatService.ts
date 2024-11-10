import {
    collection,
    doc,
    addDoc,
    onSnapshot,
    setDoc,
    query,
    orderBy,
    limit,
    updateDoc,
    getDoc,
} from "firebase/firestore";
import { db } from "./firebase";

// Función para suscribirse a los mensajes de un chat
export const subscribeToChatMessages = (
    chatId: string,
    callback: (messages: any[]) => void
) => {
    try {
        const messagesRef = collection(db, "chats", chatId, "messages");

        const q = query(messagesRef, orderBy("timestamp"), limit(50));

        const unsubscribe = onSnapshot(q, (snapshot) => {
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

// Función para enviar un mensaje al chat
export const sendMessage = async (
    chatId: string,
    userId: string,
    message: string,
    name: string
) => {
    try {
        const newMessage = {
            senderId: userId,
            text: message,
            name: name,
            timestamp: new Date(),
            read: false,
        };

        const messagesRef = collection(db, "chats", chatId, "messages");
        await addDoc(messagesRef, newMessage);
    } catch (error) {
        console.error("Error sending message:", error);
        throw new Error("Failed to send message");
    }
};

// Función para crear un chat cuando un voluntario es aceptado
export const createChatForAcceptedVolunteer = async (
    projectId: string,
    volunteerId: string,
    ongId: string
) => {
    try {
        const chatRef = doc(collection(db, "chats"));
        const chatId = chatRef.id;

        const chatData = {
            projectId,
            users: [volunteerId, ongId],
            createdAt: new Date(),
        };

        await setDoc(chatRef, chatData);

        const projectRef = doc(db, "projects", projectId);
        await updateDoc(projectRef, {
            chatId: chatId,
        });

        const volunteerRef = doc(db, "Users", volunteerId);
        const volunteerData = await getDoc(volunteerRef);

        if (volunteerData.exists()) {
            const volunteer = volunteerData.data();
            const proyectosAplicados = volunteer?.proyectosAplicados || [];

            const projectIndex = proyectosAplicados.findIndex(
                (project: any) => project.projectID === projectId
            );

            if (projectIndex !== -1) {
                proyectosAplicados[projectIndex] = {
                    ...proyectosAplicados[projectIndex],
                    chatId: chatId,
                };

                await updateDoc(volunteerRef, {
                    proyectosAplicados: proyectosAplicados,
                });
            } else {
                console.error(
                    "El proyecto no se encuentra en los proyectos aplicados del voluntario."
                );
            }
        } else {
            console.error("No se encontraron datos del voluntario.");
        }
    } catch (error) {
        console.error("Error creando el chat:", error);
    }
};
