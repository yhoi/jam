import NextAuth from "next-auth";
import InstagramProvider from "next-auth/providers/instagram";

export default NextAuth({
  providers: [
    InstagramProvider({
      clientId: "371575074916247",
      clientSecret: "41b8d4f6d4b979ad6747af6f7c235569",
      client: {
        token_endpoint_auth_method: "ad922e6da0d83da621652c7c286124c2",
      },
    }),
  ],
});
