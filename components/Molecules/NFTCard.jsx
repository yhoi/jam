import {
  Box,
  Stack,
  Image,
  Text,
  Flex,
  HStack,
  GridItem,
  Center,
} from "@chakra-ui/react";
import Router from "next/router";

export default function NFTCard({ nft, index }) {
  if (nft == null) return null;

  return (
    <>
      <Box
        bgColor="#FFFFFF"
        height="224px"
        width="100%"
        cursor="pointer"
        borderRadius="4px"
        onClick={(e) => Router.push(`/nft/${nft.id}`)}>
        <Box>
          <Center>
            <Image
              width="100%"
              height="136px"
              objectFit="cover"
              src={nft.imageURL ? nft.imageURL : "/img/NFT_Card.png"}
            />
          </Center>
        </Box>

        <Box padding="5px">
          <Text fontWeight={700}>{nft.title}</Text>
          <HStack>
            <Image
              height="16px"
              src={nft.creator.photoURL}
              borderRadius="full"
            />
            <Text fontWeight={500}>{nft.creator.displayName}</Text>
          </HStack>
          <Box>
            <Text fontWeight={500} color="#E453C4">
              {nft.price} Matic
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
}
