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
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useContext } from "react";
import { signOut } from "firebase/auth";
import Router from "next/router";
import { auth } from "../firebase/firebase";
import { meContext } from "../hooks/me";
import styles from "../styles/components/Header.module.scss";

function LoginIcon({ photoURL }) {
  return (
    <Menu>
      <MenuButton>
        <Image
          borderRadius="full"
          className={styles["header-content__icon"]}
          src={photoURL}
        />
      </MenuButton>
      <MenuList>
        <MenuItem>
          <a href="/collector/{}">プロフィール</a>
        </MenuItem>
        <MenuItem
          onClick={async () => {
            await signOut(auth);
          }}>
          <span>ログアウト</span>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

function UnLoginIcon({ photoURL }) {
  return (
    <Menu>
      <Link href="/login">
        <Image
          borderRadius="full"
          className={styles["header-content__icon"]}
          src={photoURL}
        />
      </Link>
    </Menu>
  );
}

export default function Header() {
  const { meState } = useContext(meContext);

  return (
    <>
      <Flex className={styles["header"]}>
        <Box className={styles["header-title"]}>
          <Link href="/">
            <Image
              className={styles["header-title__icon"]}
              src="/img/header_icon.png"
            />
          </Link>
        </Box>
        <Spacer />
        <Box className={styles["header-content"]}>
          <Link
            className={styles["header-content__link"]}
            color="#fff"
            href="/">
            NFT
          </Link>
          <Link
            className={styles["header-content__link"]}
            color="#fff"
            href="/collector">
            コレクター
          </Link>
          <Button
            className={styles["header-content__btn"]}
            onClick={() => {
              if (meState.uid) Router.push("/create");
              else Router.push("/login");
            }}>
            NFTを出品する
          </Button>
        </Box>
        {meState.uid ? (
          <LoginIcon photoURL={meState.photoURL} />
        ) : (
          <UnLoginIcon photoURL="/img/header_user_icon.png" />
        )}
      </Flex>
    </>
  );
}
