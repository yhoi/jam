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

export const useCollectorList = () => {
  const [collectorDocs, setCollectorDocs] = useState([]);

  useEffect(() => {
    (async () => {
      setCollectorDocs(await getCollectorData());
    })();
  }, []);

  const getCollectorData = async () => {
    const collectorQuery = query(
      collection(firestore, "users"),
      orderBy("createdAt", "desc")
    );
    const collectorDocs = await getDocs(collectorQuery);

    return collectorDocs.docs;
  };

  return { collectorDocs };
};
