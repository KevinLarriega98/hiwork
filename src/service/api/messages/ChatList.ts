import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"
import { getArrayFromCollection } from "../../../util/getArrayFromCollectionFirebase"


export const getAllConversation = (collectioName: string, docName: string) => {
  const colRef = collection(db, collectioName, docName, "chat")
  const res = getDocs(colRef)
  return getArrayFromCollection(res)
}