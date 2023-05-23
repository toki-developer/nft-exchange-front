import { useNetworkConst } from "src/utils/hooks";
import { useContractRead } from "wagmi";

import { NFT_EXCHANGE_ABI } from "../NFTExchangeABI";

const abi = NFT_EXCHANGE_ABI;

/**
 * @package
 */
export const useGetOrder = (
  senderAddress: `0x${string}`,
  enabled?: boolean
) => {
  const { nftExchangeContractAddress } = useNetworkConst();

  return useContractRead({
    address: nftExchangeContractAddress,
    abi,
    functionName: "getOrder",
    args: [senderAddress],
    enabled: enabled ?? true,
  });
};

export type Order = NonNullable<ReturnType<typeof useGetOrder>["data"]>;
