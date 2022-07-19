import "../styles/globals.scss";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "../components/Header";
import { auth, firestore } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { state, meContext } from "../hooks/me";


function MyApp({ Component, pageProps }) {
  const [meState, setMeState] = useState(state);

  //ログインしているかどうかを確認する
  useEffect(() => {
    onAuthStateChanged(auth, async (authUser) => {
      console.log("This is authUser:", authUser);
      if (authUser && authUser.displayName) {
        console.log("is logged in");
        const userRef = doc(firestore, "users", authUser.uid);
        let userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
          // ユーザをfireStoreに登録. 新規ユーザ情報入力画面に飛ばしてもいいかも
          await setDoc(userRef, {
            uid: authUser.uid,
            displayName: authUser.displayName,
            photoURL: authUser.photoURL,
            createdAt: serverTimestamp(),
          });
        }

        userDoc = await getDoc(userRef);
        const user = userDoc.data();

        setMeState({
          ...meState,
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      } else {
        console.log("is not logged in.");
        setMeState({
          ...meState,
          uid: null,
          displayName: null,
          photoURL: null,
        });
      }
    });
  }, []);

  return (
    <ChakraProvider>
      <meContext.Provider value={{ meState, setMeState }}>
        <Header />
        <Component {...pageProps} />
      </meContext.Provider>
    </ChakraProvider>
  );
}

export default MyApp;
