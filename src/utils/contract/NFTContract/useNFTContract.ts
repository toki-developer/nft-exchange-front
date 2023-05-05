import { useContract, useSigner } from "wagmi";

import { NFT_ABI } from "./NFTABI";

/**
 * @package
 */
export const useNFTContract = (address: string) => {
  const signer = useSigner();
  const contract = useContract<typeof NFT_ABI>({
    address: address,
    abi: NFT_ABI,
    signerOrProvider: signer.data,
  });
  return contract;
};
