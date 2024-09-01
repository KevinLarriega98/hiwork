import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export interface ConversationData {
  sender: {id: string, rollNameCollection: string};
  reciver: {id: string, rollNameCollection: string}[];
  idConversation: string;
  isWriting: boolean;
  whoIsWriting: string
  date: string; 
}

export interface UserData {
  id: string;
  rollNameCollection: string;
}

export const createConversation = async (userData: UserData[], obj: ConversationData) => {
    const chatName = userData[0].id + userData[1].id 
   try {
     const data = await Promise.all(userData.map(async (data) => {
      const docRef = doc(db, data.rollNameCollection, data.id, "chat", chatName);
      const res = await setDoc(docRef, {...obj, sender: data, reciver: userData.filter((tech) =>  tech.id != data.id)});
      const colRef = collection(db, data.rollNameCollection, data.id, "chat", chatName, "messages")
      await addDoc(colRef, {welcomeMessage: "Gracias por utilizar nuestra plataforma para comunicarte"})
    }))
   } catch (error) {
    console.log(error)
   }
    return chatName
}