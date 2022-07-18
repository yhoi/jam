import {
  Box,
  Text,
  Divider,
  Grid,
  Image,
  Flex,
  Link,
  Button,
  Spacer,
} from "@chakra-ui/react";
import { useContext } from "react";
import { meContext } from "../hooks/me";
import styles from "../styles/components/Header.module.scss";

export default function Header() {
  const { meState } = useContext(meContext);
  console.log(meState);
  return (
    <>
      <Flex className={styles["header"]}>
        <Box className={styles["header-title"]}>
          <Link href="/">
            <Image
              className={styles["header-title__icon"]}
              src="img/header_icon.png"
            />
          </Link>
        </Box>
        <Spacer />
        <Box className={styles["header-content"]}>
          <Link
            className={styles["header-content__link"]}
            color="#808080"
            href="/">
            NFT
          </Link>
          <Link
            className={styles["header-content__link"]}
            color="#808080"
            href="/login">
            コレクター
          </Link>
          <Button className={styles["header-content__btn"]}>
            NFTを出品する
          </Button>
        </Box>
        <Box>
          <Image
            borderRadius="full"
            className={styles["header-content__icon"]}
            src={
              meState.photoURL ? meState.photoURL : "img/header_user_icon.png"
            }
          />
        </Box>
      </Flex>
    </>
  );
}
