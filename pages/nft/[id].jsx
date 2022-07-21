import { useContext, useState, useEffect } from "react";
import { firestore } from "../../firebase/firebase";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";

export default function () {
  const router = useRouter();
  const { id } = router.query;

  //const { nftDoc } = useNFT(id);

  if (!router.isReady) return null;

  return <>{id}</>;
}
