import { useContractRead } from "wagmi";

import { NFT_EXCHANGE_ABI } from "../NFTExchangeABI";
import { useNFTExchangeContractAddress } from "../useNFTExchangeContractAddress";

const abi = NFT_EXCHANGE_ABI;

/**
 * @package
 */
export const useGetOrder = (senderAddress: `0x0${string}`) => {
  const address = useNFTExchangeContractAddress();
  return useContractRead({
    address,
    abi,
    functionName: "getOrder",
    args: [senderAddress],
  });
};
