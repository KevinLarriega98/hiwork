import { doc, onSnapshot, updateDoc } from "firebase/firestore"
import { db } from "../firebase"



export const getLastMessage = (rollColletionName: string, userId: string, chatId: string, calback: any) =>  {
  const docRef = doc(db, `${rollColletionName}s`,  userId, "chat", chatId)
  const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
      const data = docSnapshot.data()
       calback(data)
  })
  return unsubscribe
}

export const setLastMessage = async (rollColletionName: string, userId: string, chatId: string, text: string) => {
  const docRef = doc(db, `${rollColletionName}s`,  userId, "chat", chatId)
  const res = await updateDoc(docRef, {lastMessage: text})
}