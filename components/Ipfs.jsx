import { NFTStorage, File } from "nft.storage";
import fs from "fs";
import dotenv from "dotenv";
import { Button } from "@chakra-ui/react";
dotenv.config();

const API_KEY = process.env.NFT_STORAGE_API_KEY;

async function storeAsset(name, description, image, music) {
  const client = new NFTStorage({ token: API_KEY });
  const metadata = await client.store({
    name: name,
    description: description,
    image: new File([image], "image.png", { type: "image/png" }),
    animation_url: new File([music], "Music.mp3"),
  });
  console.log("Metadata stored on Filecoin and IPFS with URL:", metadata.url);
}

async function test() {
  try {
    storeAsset();
  } catch (error) {
    console.log(error);
  }
}

export function Ipfs() {
  return <Button onClick={test}>Start IPFS</Button>;
}
