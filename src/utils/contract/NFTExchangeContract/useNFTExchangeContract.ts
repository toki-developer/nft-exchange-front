// import { useContract, useSigner } from "wagmi";

// import { NFT_EXCHANGE_ABI } from "./NFTExchangeABI";
// import { useNFTExchangeContractAddress } from "./useNFTExchangeContractAddress";

// /**
//  * @package
//  */
// export const useNFTExchangeContract = () => {
//   const signer = useSigner();
//   const contractAddress = useNFTExchangeContractAddress();
//   const contract = useContract<typeof NFT_EXCHANGE_ABI>({
//     address: contractAddress,
//     abi: NFT_EXCHANGE_ABI,
//     signerOrProvider: signer.data,
//   });
//   return contract;
// };
