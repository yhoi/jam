import { Box, Stack, Image, Text, Flex, HStack } from "@chakra-ui/react";
import Router from "next/router";

export default function CollectorCard({ collector }) {
  if (collector == null) return null;

  return (
    <>
      <Box
        shadow="md"
        cursor="pointer"
        onClick={(e) => Router.push(`collector/${collector.id}`)}>
        <Image borderRadius="full" src={collector.photoURL} />
        <Box>
          <Text>{collector.displayName}</Text>
        </Box>
      </Box>
    </>
  );
}
