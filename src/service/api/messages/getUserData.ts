import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UserData } from "./createConversation";




export const getUserData = async (user: UserData[]) => {
  const docRef = doc(db, user[0].rollNameCollection, user[0].id)
  const result = await getDoc(docRef);
  return {...result.data(), id: result.id }
}