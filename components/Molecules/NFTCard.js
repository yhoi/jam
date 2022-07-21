import { Box, Stack, Image, Text, Flex, HStack } from "@chakra-ui/react";
import Router from "next/router";

export default function NFTCard({ nft }) {
  if (nft == null) return null;

  return (
    <>
      <Box
        shadow="md"
        width="240px"
        cursor="pointer"
        onClick={(e) => Router.push(`nft/${nft.id}`)}>
        <Image src={nft.imageURL} />
        <Box>
          <Text>{nft.title}</Text>
          <HStack>
            <Image
              height="16px"
              src={nft.creator.photoURL}
              borderRadius="full"
            />
            <Text>{nft.creator.displayName}</Text>
          </HStack>
          <Box>
            <Text>{nft.price} Matic</Text>
          </Box>
        </Box>
      </Box>
    </>
  );
}
