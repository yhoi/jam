import { Button } from "@chakra-ui/react";
import { React, useEffect } from "react";
import Router from "next/router";

export function Connection() {
  async function checkNetwork() {
    try {
      if (window.ethereum.networkVersion !== "80001") {
        alert("Mumbai Test Network に接続してください!");
      } else {
        Router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function checkIfWalletIsConnected() {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Make sure you have MetaMask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an authorized account:", account);
          //ネットワークが正しい時はメインページに移動
          if (window.ethereum.networkVersion == "80001") Router.push("/");
        } else {
          console.log("No authorized account found");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function connectWalletAction() {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("MetaMaskをダウンロードしてください!");
        return;
      }
      checkIfWalletIsConnected();
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected", accounts[0]);
      checkNetwork();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  //TODO: NFTを保有しているかのコントラクトを作る必要がありそう
  return (
    <Button
      color="#ffffff"
      bgGradient="linear-gradient(180deg, #5B59C1 0%, #8133CF 100%)"
      onClick={connectWalletAction}>
      MetaMaskと連携する
    </Button>
  );
}
