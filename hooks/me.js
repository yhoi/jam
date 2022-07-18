import { createContext } from "react";
import { useState } from "react";

export const state = () => ({
  uid: null,
  displayName: null,
  photoURL: null,
  walletAdress: null,
});

export const useMe = () => {
  const [me, setMe] = useState([]);

  return { me };
};

export const meContext = createContext();
