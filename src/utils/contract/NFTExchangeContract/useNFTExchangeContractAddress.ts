// const NFT_EXCHANGE_CONTRACT_ADDRESS_GOERLI =
//   process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_GOERLI;
const NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA;

/**
 * @package
 */
export const useNFTExchangeContractAddress = () => {
  //TODO: チェーンでアドレスの切り替え
  return NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA;
};
