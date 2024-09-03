import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"
import { getArrayFromCollection } from "../../../util/getArrayFromCollectionFirebase"


export const getAllConversation = (collectioName: string, docName: string) => {
  console.log(collectioName)
  const colRef = collection(db, collectioName + "s", docName, "chat")
  const res = getDocs(colRef)
  return getArrayFromCollection(res)
}