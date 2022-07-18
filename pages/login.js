import { auth } from "../firebase/firebase";
import { meContext } from "../hooks/me";
import { useEffect, useContext } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { GridItem, Button, Grid, Image, Text } from "@chakra-ui/react";
import styles from "../styles/layout/login.module.scss";

const provider = new GoogleAuthProvider();

function createGoogleAccount() {
  signInWithPopup(auth, provider)
    .then((result) => {
      // TODO:toastで通知を行う
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
}

function GoogleLogin() {
  return (
    <GridItem className={`${styles["login-area"]}`} colSpan={2}>
      <Text className={`${styles["login-area__title"]}`}>
        アカウント作成/ログイン
      </Text>
      <Text className={`${styles["login-area__content"]}`}>
        アカウント作成/ログインすることで、NFTを出品したり、
        <br />
        購入したりできます
      </Text>
      <Button
        className={`${styles["login-area__btn"]}  bg-gradation`}
        onClick={createGoogleAccount}>
        Googleでログイン
      </Button>
      <Button
        onClick={async () => {
          await signOut(auth);
        }}>
        ログアウト
      </Button>
    </GridItem>
  );
}

function MetaMaskLogin() {
  return (
    <GridItem className={`${styles["login-area"]}`} colSpan={2}>
      <Text className={`${styles["login-area__title"]}`}>ウォレット接続</Text>
      <Text className={`${styles["login-area__content"]}`}>
        MetaMaskと連携することでNFTを購入することができます
      </Text>
      <Image
        className={`${styles["login-area__fox"]}`}
        src="img/login_fox_icon.png"
      />
      <Button
        className={`${styles["login-area__btn"]}  bg-gradation`}
        onClick={createGoogleAccount}>
        MetaMaskと連携する
      </Button>
      <Button
        onClick={async () => {
          await signOut(auth);
        }}>
        ログアウト
      </Button>
    </GridItem>
  );
}

export default function login() {
  const { meState, setMeState } = useContext(meContext);

  return (
    <>
      <Grid templateColumns="repeat(3, 1fr)" height="100vh">
        <GridItem
          className={`${styles["login-sidebar"]}  bg-gradation`}
          colSpan={1}
          textAlign="center">
          <Image
            className={`${styles["login-sidebar__icon"]} `}
            src="img/login_jam_icon.png"
          />
        </GridItem>
        {/* TODO: meState以外のやり方を検討する */}
        {meState.uid == null ? <GoogleLogin /> : <MetaMaskLogin />}
      </Grid>
    </>
  );
}
