import {
  Flex,
  Box,
  Image,
  Text,
  Input,
  Grid,
  GridItem,
  Button,
} from "@chakra-ui/react";
import { auth } from "../../firebase/firebase";
import Router from "next/router";
import { useContext } from "react";
import { meContext } from "../../hooks/me";

export default function CollectorDetail({ collector, nftItemNum }) {
  if (collector == null || nftItemNum == null) return null;

  const { meState } = useContext(meContext);

  return (
    <Box className="bg-gradation" padding="0 5%">
      <Grid h="200px" templateColumns="repeat(5, 1fr)" gap={4}>
        <GridItem colSpan={1}>
          <Image src={collector.photoURL} borderRadius="full" />
        </GridItem>
        <GridItem colSpan={4}>
          <Text className="summary-title">{collector.displayName}</Text>
          <Text color="#ffffff">NFT数</Text>
          <Text color="#ffffff">{nftItemNum}</Text>
          {meState.uid == collector.uid && (
            <Button
              bgColor="#ffffff"
              color="#773DCB"
              onClick={(e) => Router.push(`/collector/${collector.uid}/edit`)}>
              編集する
            </Button>
          )}
        </GridItem>
      </Grid>
    </Box>
  );
}
