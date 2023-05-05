const NFT_EXCHANGE_CONTRACT_ADDRESS_GOERLI =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_GOERLI;

/**
 * @package
 */
export const useNFTExchangeContractAddress = () => {
  //TODO: チェーンでアドレスの切り替え
  return NFT_EXCHANGE_CONTRACT_ADDRESS_GOERLI;
};
