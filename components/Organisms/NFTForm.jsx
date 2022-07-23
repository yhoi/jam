import { Box, Button, Text, Image, Input, SimpleGrid, Textarea, Radio, RadioGroup, Stack, Flex } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage, auth } from "../../firebase/firebase";
import styles from "../../styles/layout/create.module.scss";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function NFTForm({ formData, setFormData, testData, setTestForm }) {
  const onDrop = useCallback((acceptedFiles) => {
    console.log("onDrop:", acceptedFiles);
    if (acceptedFiles[0]) {
      const originalFileName = acceptedFiles[0].name;
      const fileObj = acceptedFiles[0];

      console.log(fileObj);
      console.log("これが型:", typeof fileObj);
      setTestForm({ ...testData, image: fileObj });

      const storageRef = ref(storage, `images/${auth.currentUser.uid}/${originalFileName}`);
      console.log(storageRef);
      // TODO: コンポーネントにてawaitの処理に変更
      uploadBytes(storageRef, fileObj).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          console.log(url);
          setFormData({ ...formData, imageURL: url });
        });
        console.log("file upload is done");
        console.log(formData);
      });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  function DisplayAudio() {
    return <ReactPlayer config={{ file: { attributes: { controlsList: "nodownload" } } }} width="100%" height="50px" controls={true} volume={1} url={formData.audioURL} />;
  }

  return (
    <SimpleGrid columns={2}>
      <Box>
        {formData.imageURL ? (
          <Image src={formData.imageURL} />
        ) : (
          <Box className={`${styles["create-dropbox"]}`} {...getRootProps()} w="300px" h="300px">
            <input {...getInputProps()} />
            <Text>背景画像の追加</Text>
          </Box>
        )}
        <DisplayAudio />
      </Box>
      <Box>
        <Box>
          <Text>タイトル</Text>
          <Input
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
            }}
          />
        </Box>

        <Box>
          <Text>説明</Text>
          <Textarea
            onChange={(e) => {
              setFormData({ ...formData, description: e.target.value });
            }}
          />
        </Box>

        <Box>
          <Text>ステータス</Text>
          <RadioGroup
            defaultValue="1"
            value={formData.salesStatus}
            onChange={(e) => {
              setFormData({ ...formData, salesStatus: e });
            }}
          >
            <Stack>
              <Radio value="sell">販売中</Radio>
              <Radio value="notsell">販売終了</Radio>
            </Stack>
          </RadioGroup>
        </Box>

        <Flex>
          <Text>出品額</Text>
          <Input
            width="30%"
            type="number"
            onChange={(e) => {
              setFormData({ ...formData, price: Number(e.target.value) });
            }}
          />
          <Text>Matic</Text>
        </Flex>

        <Flex>
          <Text>ロイヤリティ</Text>
          <Input
            width="30%"
            type="number"
            min="0"
            max="10"
            onChange={(e) => {
              setFormData({ ...formData, royalty: Number(e.target.value) });
            }}
          />
          <Text>%</Text>
        </Flex>
      </Box>
    </SimpleGrid>
  );
}
