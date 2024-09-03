import { collection, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore"
import { db } from "../firebase"
import { SetStateAction } from "react"


export const isWriting = (rollColletionName: string, userId: string, chatId: string, calback: any) =>  {
  const docRef = doc(db, `${rollColletionName}s`,  userId, "chat", chatId)
  const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
      const data = docSnapshot.data()
       calback(data?.isWriting)
  })
  return unsubscribe
}

export const setWriting = async (rollColletionName: string, userId: string, chatId: string) => {
  const docRef = doc(db, `${rollColletionName}s`,  userId, "chat", chatId)
  const res = await updateDoc(docRef, {isWriting: true})
  setTimeout(() => {
    cleanWriting(rollColletionName, userId, chatId)
  }, 3000)
}


export const cleanWriting = async (rollColletionName: string, userId: string, chatId: string) => {
  const docRef = doc(db, `${rollColletionName}s`,  userId, "chat", chatId)
  const res = await updateDoc(docRef, {isWriting: false})
}