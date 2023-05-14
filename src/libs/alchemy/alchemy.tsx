import { Alchemy, Network } from "alchemy-sdk";

const settings = {
  sepolia: {
    apiKey: "vD-mZ9gCDOlU_Yp2jr-zEmrSH3K46VfS",
    network: Network.ETH_SEPOLIA,
  },
};

export const alchemySepolia = new Alchemy(settings.sepolia);
