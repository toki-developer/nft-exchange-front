declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: string;
    NEXT_PUBLIC_CONTRACT_ADDRESS_GOERLI: `0x${string}`;
    NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA: `0x${string}`;
    NEXT_PUBLIC_ALCHEMY_API_SEPOLIA: string;
  }
}
