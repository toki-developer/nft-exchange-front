import type { BigNumber } from "ethers";
import type { Address } from "wagmi";

/**
 * @package
 */
export type NFTInputFieldType = {
  contractAddress: Address | null;
  tokenId: BigNumber | null;
};

/**
 * @package
 */
export type NFTForm = {
  senderNFTContractAddress: Address;
  senderNFTTokenId: BigNumber;
  receiverNFTContractAddress: Address;
  receiverNFTTokenId: BigNumber;
};
