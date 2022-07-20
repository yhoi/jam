import { Box, Stack, Image, Text, Flex, HStack } from "@chakra-ui/react";

export default function NFTCard() {
  return (
    <>
      <Box shadow="md" width="240px">
        <Image src="img/NFT_Test.png" />
        <Box>
          <Text>title</Text>
          <HStack>
            <Image
              height="16px"
              src="img/login_fox_icon.png"
              borderRadius="full"
            />
            <Text>作者名</Text>
          </HStack>
          <Box>
            <Text>11円</Text>
          </Box>
        </Box>
      </Box>
    </>
  );
}
