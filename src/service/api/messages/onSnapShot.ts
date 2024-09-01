import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";


export const getNewMessage = (calback: any, collectionName: string, userUid: string, chatId: string) => {
  const colRef = query(collection(db, collectionName, userUid, chatId), orderBy('date'));
  const unsubscribe = onSnapshot(colRef, (snapshot) => {

    calback(snapshot.docs.map( doc => ({
        ...doc.data(),
        id: doc.id,
    })));

  });

  return unsubscribe;
};
