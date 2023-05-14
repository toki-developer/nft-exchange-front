import { Alchemy, Network } from "alchemy-sdk";

const settings = {
  sepolia: {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_SEPOLIA,
    network: Network.ETH_SEPOLIA,
  },
};

export const alchemySepolia = new Alchemy(settings.sepolia);
