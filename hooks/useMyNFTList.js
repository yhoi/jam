import { useState, useEffect } from "react";
import { firebaseApp, firestore, auth } from "../firebase/firebase";
import {
  query,
  where,
  orderBy,
  doc,
  getDocs,
  collection,
  getDoc,
} from "firebase/firestore";
import { async } from "@firebase/util";

export const useMyNftList = (id) => {
  const [myNftDocs, setMyNftDocs] = useState([]);

  useEffect(() => {
    if (id == null) return;

    (async () => {
      setMyNftDocs(await getMyNftData());
    })();
  }, [id]);

  const getMyNftData = async () => {
    const firestoreUserRef = doc(firestore, "users", id);

    const myNftQuery = query(
      collection(firestore, "nft"),
      where("creatorRef", "==", firestoreUserRef),
      orderBy("createdAt", "desc")
    );
    const myNftDocs = await getDocs(myNftQuery);

    return myNftDocs.docs;
  };

  return { myNftDocs };
};
