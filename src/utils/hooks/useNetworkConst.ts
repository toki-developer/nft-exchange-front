import { Alchemy, Network } from "alchemy-sdk";
import type { Address } from "wagmi";
import { useNetwork } from "wagmi";
import { mainnet, polygon } from "wagmi/chains";

type Return = {
  alchemy: Alchemy;
  blockexplorerPrefix: string;
  nftExchangeContractAddress: Address;
};

export const useNetworkConst = (): Return => {
  const { chain } = useNetwork();

  if (chain?.name == polygon.name) {
    return {
      alchemy: alchemyPolygon,
      blockexplorerPrefix: ETHERSCAN_POLYGON,
      nftExchangeContractAddress: NEXT_PUBLIC_CONTRACT_ADDRESS_POLYGON,
    };
  }

  if (chain?.name == mainnet.name) {
    return {
      alchemy: alchemyMainnet,
      blockexplorerPrefix: ETHERSCAN_MAINNET,
      nftExchangeContractAddress: NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET,
    };
  }

  return {
    alchemy: alchemySepolia,
    blockexplorerPrefix: ETHERSCAN_SEPOLIA,
    nftExchangeContractAddress: NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA,
  };
};

// Sepolia
const ETHERSCAN_SEPOLIA = "https://sepolia.etherscan.io";
const NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA;

// Polygon
const ETHERSCAN_POLYGON = "https://polygonscan.com";
const NEXT_PUBLIC_CONTRACT_ADDRESS_POLYGON =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_POLYGON;

// Ethereum
const ETHERSCAN_MAINNET = "https://etherscan.io";
const NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET;

// Alchemy
const settings = {
  sepolia: {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_SEPOLIA,
    network: Network.ETH_SEPOLIA,
  },
  polygon: {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_POLYGON,
    network: Network.MATIC_MAINNET,
  },
  mainnet: {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_POLYGON,
    Network: Network.ETH_MAINNET,
  },
};

const alchemySepolia = new Alchemy(settings.sepolia);
const alchemyPolygon = new Alchemy(settings.polygon);
const alchemyMainnet = new Alchemy(settings.mainnet);
