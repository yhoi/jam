import { Button, Image, Box } from "@chakra-ui/react";
import { React, useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "./utils/constants";
import RoyaltyNFT from "./utils/RoyaltyNFT.json";

export default function Mint({ nft }) {
  const [jamContract, setJamContract] = useState(null);

  if (nft == null) return null;

  // Maybe you need to delete characterId
  async function mintJamNFTAction() {
    try {
      if (jamContract) {
        // change Attribute
        const royalty = nft.royalty * 100;
        let mintTxn;
        console.log("This is JamContract:", jamContract);
        // 商品名、画像のURL、ロイヤリティの値をユーザーから受け取ればオッケー
        mintTxn = await jamContract.mintJamNFT(
          "0xDfb5d126aCFBa7391f94a045FDAc08969Ea9B918",
          1,
          nft.title,
          nft.imageURL,
          nft.audioURL,
          royalty
        );
        await mintTxn.wait();
        console.log("mint finish");
        console.log("Minted NFT #1");
      }
    } catch (error) {
      console.log("MintJamAction Error:", error);
    }
  }

  useEffect(() => {
    const makeJamContract = async () => {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const jamContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          RoyaltyNFT.abi,
          signer
        );
        setJamContract(jamContract);
      } else {
        console.log("Ethereum object not found");
      }
    };

    makeJamContract();
  }, []);

  useEffect(() => {
    async function JamNFTMinted(sender, tokenId) {
      console.log(
        `JamNFTMinted - sender: ${sender} tokenId: ${tokenId.toNumber()}`
      );
      if (jamContract) {
        alert(
          `NFTがMintされました -- リンクはこちらです: https://testnet.rarible.com/collection/polygon/${jamContract.address}/items`
        );
      }
    }

    if (jamContract) {
      jamContract.on("JamNFTMinted", JamNFTMinted);
    }

    return () => {
      if (jamContract) {
        jamContract.off("JamNFTMinted", JamNFTMinted);
      }
    };
  }, [jamContract]);

  return (
    <Button
      color="#ffffff"
      bgGradient="linear-gradient(180deg, #5B59C1 0%, #8133CF 100%)"
      onClick={mintJamNFTAction}>
      購入して所有する
    </Button>
  );
}
