import { useState, useEffect } from "react";
import { firebaseApp, firestore, auth } from "../firebase/firebase";
import {
  query,
  where,
  orderBy,
  doc,
  getDocs,
  collection,
} from "firebase/firestore";
import { async } from "@firebase/util";

export const useNftList = () => {
  const [nftDocs, setNftDocs] = useState([]);

  useEffect(() => {
    (async () => {
      setNftDocs(await getNftData());
    })();
  }, []);

  const getNftData = async () => {
    const nftQuery = query(
      collection(firestore, "nft"),
      orderBy("createdAt", "desc")
    );
    const nftDocs = await getDocs(nftQuery);

    return nftDocs.docs;
  };

  return { nftDocs };
};
