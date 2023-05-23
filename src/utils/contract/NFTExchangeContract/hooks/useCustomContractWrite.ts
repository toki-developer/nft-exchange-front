import { useNetworkConst } from "src/utils/hooks";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

import { NFT_EXCHANGE_ABI } from "../NFTExchangeABI";

/**
 * @package
 */
export type UsePrepareContractWriteConfig<T extends string> = NonNullable<
  Parameters<
    ReturnType<
      <U extends number>() => typeof usePrepareContractWrite<
        typeof NFT_EXCHANGE_ABI,
        T,
        U
      >
    >
  >[0]
>;

type Param =
  | {
      functionName: "createOrder";
      args: UsePrepareContractWriteConfig<"createOrder">["args"];
    }
  | {
      functionName: "approveOrder";
      args: UsePrepareContractWriteConfig<"approveOrder">["args"];
    };

/**
 * @package
 */
export const useCustomContractWrite = ({ args, functionName }: Param) => {
  const { nftExchangeContractAddress } = useNetworkConst();

  const { config } = usePrepareContractWrite({
    address: nftExchangeContractAddress,
    abi: NFT_EXCHANGE_ABI,
    functionName: functionName,
    args: args,
  });
  return useContractWrite(config);
};
