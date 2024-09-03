import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";


export const getNewMessage = (calback: any, collectionName: string, userUid: string, chatId: string) => {
  try {
    const colRef = query(collection(db,  `${collectionName}s`, userUid, "chat",chatId, "messages"), orderBy('date',"desc")); 
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      calback(snapshot.docs.map( doc => {
        return {
          ...doc.data(),
          id: doc.id,
      }}));

    });
    
    return unsubscribe;
  } catch (error) {
    console.log(error)
  }
};
