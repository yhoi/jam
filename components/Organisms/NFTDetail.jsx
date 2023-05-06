import {
  Flex,
  Box,
  SimpleGrid,
  Image,
  Text,
  Center,
  Grid,
  GridItem,
  HStack,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

import Mint from "../Mint";

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
    <Grid templateColumns="repeat(5, 1fr)">
      <GridItem colSpan={2} padding="40px">
        <Center marginBottom="40px">
          {nft.imageURL ? (
            <Image borderRadius="4px" src={nft.imageURL} />
          ) : (
            <Image borderRadius="4px" src="/img/NFT_Card.png" />
          )}
        </Center>

        <DisplayAudio />
      </GridItem>
      <GridItem colSpan={3} padding="40px">
        <Box>
          <Text fontSize="32px" fontWeight={700}>
            {nft.title}
          </Text>
        </Box>

        <HStack marginBottom="24px">
          <Image
            height="16px"
            src={nft.creatorRefObject.photoURL}
            borderRadius="full"
          />
          <Text fontWeight={500}>{nft.creatorRefObject.displayName}</Text>
        </HStack>

        <Box marginBottom="24px">
          <Text fontWeight={500}>{nft.description}</Text>
        </Box>

        <Box marginBottom="24px">
          <Text>出品額:</Text>
          <Text
            fontSize="24px"
            bgGradient="linear-gradient(180deg, #5B59C1 0%, #8133CF 100%)"
            bgClip="text"
            fontWeight={700}>
            {`${nft.price} Matic`}
          </Text>
        </Box>

        <Mint nft={nft} />
      </GridItem>
    </Grid>
  );
}
