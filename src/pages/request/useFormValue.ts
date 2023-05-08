import { useFormContext } from "react-hook-form";

import { useStatusContext } from "./StatusContext";
import type { NFTForm } from "./type";

/**
 * @package
 */
export const useFormValue = () => {
  const { watch } = useFormContext<NFTForm>();
  const senderNFTContractAddress = watch("senderNFTContractAddress");
  const senderNFTTokenId = watch("senderNFTTokenId");
  const receiverNFTContractAddress = watch("receiverNFTContractAddress");
  const receiverNFTTokenId = watch("receiverNFTTokenId");

  const { status } = useStatusContext();

  return {
    status,
    senderNFTContractAddress,
    senderNFTTokenId,
    receiverNFTContractAddress,
    receiverNFTTokenId,
  };
};
