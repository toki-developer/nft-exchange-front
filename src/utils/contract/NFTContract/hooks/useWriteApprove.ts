import type { BigNumber } from "ethers";
import { useNetworkConst } from "src/utils/hooks";
import type { Address, UsePrepareContractWriteConfig } from "wagmi";
import { useContractWrite } from "wagmi";
import { usePrepareContractWrite } from "wagmi";

import { NFT_ABI } from "../NFTABI";

type Props = {
  nftAddress: Address;
  nftTokenId: BigNumber;
} & UsePrepareContractWriteConfig<typeof NFT_ABI, "approve">;

/**
 * @package
 */
export const useWriteApprove = ({ nftAddress, nftTokenId, ...rest }: Props) => {
  const { nftExchangeContractAddress } = useNetworkConst();

  const { config } = usePrepareContractWrite({
    ...rest,
    address: nftAddress,
    abi: NFT_ABI,
    functionName: "approve",
    args: [nftExchangeContractAddress, nftTokenId],
  });
  return useContractWrite(config);
};
