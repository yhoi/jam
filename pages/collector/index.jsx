import { Box, Text, Input } from "@chakra-ui/react";
import Head from "next/head";
import CollectorList from "../../components/Organisms/CollectorList";
import { useCollectorList } from "../../hooks/useCollectorList";

export default function collector() {
  const { collectorDocs } = useCollectorList();

  return (
    <>
      <Box className="summary bg-gradation">
        <Text className="summary-title">NFT</Text>
        <Input
          bg="#ffffff"
          width="30%"
          className="summary-search"
          placeholder="検索"
        />
      </Box>
      <CollectorList collectorDocs={collectorDocs} />
    </>
  );
}
