import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

type Rute = {
  
  object: Record<any, any>
}

//aqui se pasara la ruta del sender
export const sendNewMessage = async (reciverCollectionName: string, reciverId: string, chatId: string, object: any) => {
  const colRef = collection(db, reciverCollectionName + "s", reciverId,"chat", chatId, "messages")
  const res = await addDoc(colRef, object)
  return res.id
}