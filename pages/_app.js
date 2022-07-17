import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ChakuraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ChakuraProvider>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ChakuraProvider>
  );
}

export default MyApp;
