import { useContext, useState, useEffect } from "react";
import { firestore } from "../../firebase/firebase";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";
import { useNft } from "../../hooks/useNFT";
import NFTDetail from "../../components/Organisms/NFTDetail";

export default function () {
  const router = useRouter();
  const { id } = router.query;
  const { nft } = useNft(id);

  if (!router.isReady || nft == null) return null;

  return (
    <>
      <NFTDetail nft={nft} />
    </>
  );
}
