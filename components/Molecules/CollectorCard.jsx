import {
  Box,
  Stack,
  Image,
  Text,
  Flex,
  HStack,
  Center,
} from "@chakra-ui/react";
import Router from "next/router";

export default function CollectorCard({ collector }) {
  if (collector == null) return null;

  return (
    <>
      <Box
        padding="24px"
        bgColor="#FFFFFF"
        height="192px"
        width="192px"
        cursor="pointer"
        onClick={(e) => Router.push(`collector/${collector.id}`)}>
        <Center>
          <Image borderRadius="full" src={collector.photoURL} />{" "}
        </Center>
        <Center padding="16px">
          <Text fontWeight={700}>{collector.displayName}</Text>
        </Center>
      </Box>
    </>
  );
}
