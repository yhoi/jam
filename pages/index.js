import { Box, Text, Input } from "@chakra-ui/react";
import Head from "next/head";
import NFTCard from "../components/Molecules/NFTCard";
import NFTList from "../components/Organisms/NFTList";
import styles from "../styles/layout/Home.module.scss";
import { useNftList } from "../hooks/useNFTList";

export default function Home() {
  const { nftDocs } = useNftList();

  return (
    <div className="">
      <Head>
        <title>JAM</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Box className="summary bg-gradation">
        <Text className="summary-title">NFT</Text>
        <Input
          bg="#ffffff"
          width="30%"
          className="summary-search"
          placeholder="検索"
        />
      </Box>
      <NFTList nftDocs={nftDocs} />
    </div>
  );
}
