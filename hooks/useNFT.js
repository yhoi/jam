import { useState, useEffect } from "react";
import { firestore, auth } from "../firebase/firebase";
import {
  nuery,
  where,
  orderBy,
  doc,
  getDoc,
  collection,
} from "firebase/firestore";
import { async } from "@firebase/util";

export const useNft = (id) => {
  const [nft, setNft] = useState(null);

  useEffect(() => {
    if (id == null) return;

    (async () => {
      setNft(await getNft());
    })();
  }, [id]);

  const getNft = async () => {
    const nftRef = doc(firestore, "nft", id);
    const nftSnap = await getDoc(nftRef);
    const n = nftSnap.data();

    n.id = id;

    const creator = await getDoc(n.creatorRef);
    n.creatorRefObject = creator.data();
    delete n.creatorRef;

    return n;
  };

  return { nft };
};
