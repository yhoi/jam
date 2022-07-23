import Link from "next/link";
import { firestore } from "../../firebase/firebase";
import { Box, Image, HStack } from "@chakra-ui/react";
import { Timestamp, doc, getDoc, collection, query, orderBy, getDocs, onSnapshot } from "firebase/firestore";
import Router from "../../node_modules/next/router";
import { useContext, useState, useEffect } from "react";
import { async } from "@firebase/util";
import NFTCard from "../Molecules/NFTCard";

export default function NFTList({ nftDocs }) {
  const [nftList, setNftList] = useState(null);
  const [displayNftList, setDisplayNftList] = useState([]);

  useEffect(() => {
    if (nftDocs == null) return;

    (async () => {
      await getNftList();
    })();
  }, [nftDocs]);

  async function getNftList() {
    const nftList = await Promise.all(
      nftDocs.map(async (nftDoc) => {
        const nft = nftDoc.data();
        nft.id = nftDoc.id;

        //制作者のデータを挿入
        const creatorDoc = await getDoc(nft.creatorRef);
        nft.creator = creatorDoc.data();
        delete nft.creatorRef;

        return nft;
      })
    );
    console.log(nftList);
    setNftList(nftList);
  }

  if (nftList == null) {
    return <p>loading quiz</p>;
  }

  return (
    <>
      {nftList.map((nft) => {
        return <NFTCard nft={nft} />;
      })}
    </>
  );
}
