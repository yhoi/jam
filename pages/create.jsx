import { Box, Button, Text, Image, Input } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { addDoc, serverTimestamp, doc, collection } from "firebase/firestore";
import Router from "next/router";

import { storage, auth, firestore } from "../firebase/firebase";
import NFTForm from "../components/Organisms/NFTForm";
import UploadAudio from "../components/Organisms/UploadAudio";
import styles from "../styles/layout/create.module.scss";

export default function create() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    royalty: 0,
    imageURL: "",
    audioURL: "",
    price: 0,
    salesStatus: "sell",
  });

  async function createNFTPage() {
    if (
      [
        formData.title.length,
        formData.description.length,
        formData.audioURL.length,
      ].includes(0)
    ) {
      // FIXME: 入力箇所を赤く強調する
      alert("未入力の箇所はあります");
      return;
    }

    const nftDoc = await addDoc(collection(firestore, "nft"), {
      title: formData.title,
      description: formData.description,
      price: formData.price,
      royalty: formData.royalty,
      imageURL: formData.imageURL,
      audioURL: formData.audioURL,
      salesStatus: formData.salesStatus,
      createdAt: serverTimestamp(),
      creatorRef: doc(firestore, "users", auth.currentUser.uid),
    });

    console.log(nftDoc.id);

    Router.push(`/nft/${nftDoc.id}`);
  }

  return (
    <>
      <Box className={`${styles["create"]}`}>
        <Text className={`${styles["create-title"]}`}>NFTを出品する</Text>
        {formData.audioURL.length != 0 ? (
          <NFTForm formData={formData} setFormData={setFormData} />
        ) : (
          <UploadAudio formData={formData} setFormData={setFormData} />
        )}
        {formData.audioURL.length != 0 && (
          <Box className={`${styles["create-footer"]}`}>
            <Button
              className={`${styles["create-footer__btn"]}`}
              onClick={createNFTPage}>
              NFTを出品する
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
}
