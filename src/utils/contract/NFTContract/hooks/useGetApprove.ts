import type { BigNumber } from "ethers";
import type { Address, UseContractReadConfig } from "wagmi";
import { useContractRead } from "wagmi";

import { NFT_ABI } from "../NFTABI";

const abi = NFT_ABI;

type Props = {
  nftAddress: Address;
  nftTokenId: BigNumber;
} & Omit<UseContractReadConfig<typeof abi>, "structuralSharing">;

/**
 * @package
 */
export const useGetApprove = ({ nftAddress, nftTokenId, ...rest }: Props) => {
  return useContractRead({
    ...rest,
    address: nftAddress,
    abi,
    functionName: "getApproved",
    args: [nftTokenId],
  });
};
