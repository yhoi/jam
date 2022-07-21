import {
  Box,
  Button,
  Text,
  Image,
  Input,
  Grid,
  GridItem,
  SimpleGrid,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage, auth } from "../../firebase/firebase";
import styles from "../../styles/layout/create.module.scss";
("https://firebasestorage.googleapis.com/v0/b/mint-nft-dev.appspot.com/o/audios%2FeWPJwAUQe9f15Ht2DusPks3jSG12%2FOkinawaMusic.mp3?alt=media&token=9af58048-b777-4666-be1c-834bb8049467");

export default function UploadAudio({ formData, setFormData }) {
  const onDrop = useCallback((acceptedFiles) => {
    console.log("onDrop:", acceptedFiles);
    if (acceptedFiles[0]) {
      const originalFileName = acceptedFiles[0].name;
      const fileObj = acceptedFiles[0];
      const storageRef = ref(
        storage,
        `audios/${auth.currentUser.uid}/${originalFileName}`
      );
      console.log(storageRef);
      // TODO: コンポーネントにてawaitの処理に変更
      uploadBytes(storageRef, fileObj).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          console.log(url);
          setFormData({ ...formData, audioURL: url });
        });
        console.log("file upload is done");
        console.log(formData);
      });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <Box
      className={`${styles["create-dropbox"]}`}
      {...getRootProps()}
      w="300px"
      h="300px">
      <input {...getInputProps()} />
      <Button className={`${styles["create-dropbox__btn"]} bg-gradation`}>
        音声を選択
      </Button>
      <Text>形式:mp3,</Text>
    </Box>
  );
}
