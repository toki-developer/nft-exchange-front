import type { BigNumber } from "ethers";
import { useNFTExchangeContractAddress } from "src/utils/contract";
import type { Address } from "wagmi";
import { useContractWrite } from "wagmi";
import { usePrepareContractWrite } from "wagmi";

import { NFT_ABI } from "../NFTABI";

/**
 * @package
 */
export const useWriteApprove = (nftAddress: Address, nftTokenId: BigNumber) => {
  const nftExchangeAddress = useNFTExchangeContractAddress();

  const { config } = usePrepareContractWrite({
    address: nftAddress,
    abi: NFT_ABI,
    functionName: "approve",
    args: [nftExchangeAddress, nftTokenId],
  });
  return useContractWrite(config);
};
