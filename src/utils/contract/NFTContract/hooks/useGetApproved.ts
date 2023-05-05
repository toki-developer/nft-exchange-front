import type { BigNumber } from "ethers";
import type { Address } from "wagmi";
import { useContractRead } from "wagmi";

import { NFT_ABI } from "../NFTABI";

const abi = NFT_ABI;

type Props = {
  address: Address;
  tokenId: BigNumber;
};

/**
 * @package
 */
export const useGetApproved = ({ address, tokenId }: Props) => {
  const a = useContractRead({
    address,
    abi,
    functionName: "getApproved",
    args: [tokenId],
  });
  return a;
};
