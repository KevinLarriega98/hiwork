import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore"
import { db } from "../firebase"




export const updateIsRead = async (rollColletionName: string, userId: string, chatId: string) => {
  const docRef = doc(db, `${rollColletionName}s`,  userId, "chat", chatId)
  const res = await updateDoc(docRef, {isRead: false, countNoRead: 0})
}


export const createNoRead = async (rollColletionName: string, userId: string, chatId: string) => {
  const docRef = doc(db, `${rollColletionName}s`,  userId, "chat", chatId)
  const respDoc = (await getDoc(docRef)).data()
  const currenCount = Number(respDoc?.countNoRead) || 0
  const res = await updateDoc(docRef, {isRead: true, countNoRead: currenCount + 1, date: serverTimestamp()})
}