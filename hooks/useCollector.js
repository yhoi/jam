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

export const useCollector = (id) => {
  const [collector, setCollector] = useState(null);

  useEffect(() => {
    if (id == null) return;

    (async () => {
      setCollector(await getCollector());
    })();
  }, [id]);

  const getCollector = async () => {
    const collectorRef = doc(firestore, "users", id);
    const collectorSnap = await getDoc(collectorRef);

    return collectorSnap.data();
  };

  return { collector };
};
