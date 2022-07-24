import { firestore } from "../../../firebase/firebase";
import { useRouter } from "next/router";
import { useMyNftList } from "../../../hooks/useMyNFTList";
import { useCollector } from "../../../hooks/useCollector";
import CollectorDetail from "../../../components/Organisms/CollectorDetail";
import NFTList from "../../../components/Organisms/NFTList";

export default function () {
  const router = useRouter();
  const { id } = router.query;
  const { myNftDocs } = useMyNftList(id);
  const { collector } = useCollector(id);

  if (!router.isReady || myNftDocs == null || collector == null) return null;

  return (
    <>
      <CollectorDetail collector={collector} nftItemNum={myNftDocs.length} />
      <NFTList nftDocs={myNftDocs} />
    </>
  );
}
