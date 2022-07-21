import { Flex, Box, SimpleGrid, Image, Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function NFTDetail({ nft }) {
  if (nft == null) return null;

  console.log(nft);

  function DisplayAudio() {
    return (
      <ReactPlayer
        config={{ file: { attributes: { controlsList: "nodownload" } } }}
        width="100%"
        height="50px"
        controls={true}
        volume={1}
        url={nft.audioURL}
      />
    );
  }

  return (
    <SimpleGrid columns={2}>
      <Box>
        {nft.imageURL ? <Image src={nft.imageURL} /> : <Box></Box>}
        <DisplayAudio />
      </Box>
      <Box>
        <Box>
          <Text>{nft.title}</Text>
        </Box>

        <Box>
          <Text>説明</Text>
          <Text>{nft.description}</Text>
        </Box>

        <Flex>
          <Text>{`出品額 ${nft.price} Matic`}</Text>
        </Flex>
      </Box>
    </SimpleGrid>
  );
}
