import Link from "next/link";
import { firestore } from "../../firebase/firebase";
import { Box, Image, HStack, SimpleGrid } from "@chakra-ui/react";
import {
  Timestamp,
  doc,
  getDoc,
  collection,
  query,
  orderBy,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import Router from "next/router";
import { useContext, useState, useEffect } from "react";
import { async } from "@firebase/util";
import CollectorCard from "../Molecules/CollectorCard";

export default function CollectorList({ collectorDocs }) {
  const [collectorList, setCollectorList] = useState(null);
  const [displayCollectorList, setDisplayCollectorList] = useState([]);

  useEffect(() => {
    if (collectorDocs == null) return;

    (async () => {
      await getCollectorList();
    })();
  }, [collectorDocs]);

  async function getCollectorList() {
    const collectorList = await Promise.all(
      collectorDocs.map(async (collectorDoc) => {
        const collector = collectorDoc.data();
        collector.id = collectorDoc.id;

        return collector;
      })
    );
    setCollectorList(collectorList);
  }

  if (collectorList == null) {
    return <p>loading quiz</p>;
  }

  return (
    <>
      <SimpleGrid
        bgColor="#F9F9FA"
        minChildWidth="192px"
        spacing="16px"
        padding="60px 60px">
        {collectorList.map((collector) => {
          return <CollectorCard collector={collector} />;
        })}
      </SimpleGrid>
    </>
  );
}
