import { addDoc, collection } from "firebase/firestore"
import { db } from "../firebase"

interface Rute {
  object: Record<string, string | boolean | number >
}
//aqui se pasara la ruta del remitente
export const setNewMessage = async (collectionName: string, userUid:string, chatId:string, object:any)=> {
  try {

    if (!object.message) {
      throw new Error("Receiver field is undefined");
    }

    const colRef = collection(db, collectionName + "s", userUid, "chat", chatId, "messages")
    const res = await addDoc(colRef, object)
    return res.id
  } catch (error) {
    console.log(error)
  }
}