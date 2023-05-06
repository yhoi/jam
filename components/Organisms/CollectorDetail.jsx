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
    <Box className="bg-gradation" padding="48px" height="358px">
      <Grid templateColumns="repeat(5, 1fr)" gap={4} paddingX="92px">
        <GridItem colSpan={1}>
          <Image width="100%" src={collector.photoURL} borderRadius="full" />
        </GridItem>
        <GridItem colSpan={4}>
          <Text
            fontSize="32px"
            marginBottom="24px"
            fontWeight={700}
            className="summary-title">
            {collector.displayName}
          </Text>
          <Box paddingX="33px" marginBottom="24px">
            <Text color="#ffffff" fontWeight={500}>
              NFT数
            </Text>
            <Box paddingLeft="15px">
              <Text color="#ffffff" fontSize="24px" fontWeight={700}>
                {nftItemNum}
              </Text>
            </Box>
          </Box>

          {meState.uid == collector.uid && (
            <Button
              marginLeft="80%"
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
