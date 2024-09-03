import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Dispatch, SetStateAction } from "react";

export interface ConversationData {
  id?: string;
  sender: {id: string, rollNameCollection: string};
  reciver: {id: string, rollNameCollection: string}[];
  idConversation: string;
  isWriting: boolean;
  whoIsWriting: string
  date: {nanoseconds: string, seconds:string}; 
  lastMessage: string;
  isRead: boolean;
  countNoRead: number;
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
    console.log("line 28 doc createConversation",error)
   }
    return chatName
}