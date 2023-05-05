import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  useNFTContract,
  useNFTExchangeContractAddress,
} from "src/utils/contract";

import { STATUS, useStatusContext } from "./StatusContext";
import type { NFTForm } from "./type";

/**
 * @package
 */
export const useStatusCheck = () => {
  const {
    formState: { errors },
    watch,
  } = useFormContext<NFTForm>();
  const senderNFTContractAddress = watch("senderNFTContractAddress");
  const senderNFTTokenId = watch("senderNFTTokenId");
  const receiverNFTContractAddress = watch("receiverNFTContractAddress");
  const receiverNFTTokenId = watch("receiverNFTTokenId");

  const contract = useNFTContract(senderNFTContractAddress);
  const NFT_EXCHANGE_ADDRESS = useNFTExchangeContractAddress();

  const { setStatus, status } = useStatusContext();
  const [prevNFT, setPrevNFT] = useState<string>("");

  const isError = Object.keys(errors).length == 0;
  const isFullInput =
    senderNFTContractAddress &&
    senderNFTTokenId &&
    receiverNFTContractAddress &&
    receiverNFTTokenId
      ? true
      : false;

  useEffect(() => {
    if (isError && isFullInput) {
      if (prevNFT !== `${senderNFTContractAddress}-${senderNFTTokenId}`) {
        contract
          ?.getApproved(senderNFTTokenId)
          .then((res) => {
            if (res === NFT_EXCHANGE_ADDRESS) {
              setStatus(STATUS.APPROVED);
            } else {
              setStatus(STATUS.NO_APPROVED);
            }
            setPrevNFT(`${senderNFTContractAddress}-${senderNFTTokenId}`);
          })
          .catch((e) => {
            console.error(e);
          });
      }
    } else {
      if (status !== STATUS.ERRPR) {
        setStatus(STATUS.ERRPR);
        setPrevNFT("");
      }
    }
  }, [
    isFullInput,
    isError,
    senderNFTContractAddress,
    senderNFTTokenId,
    status,
    prevNFT,
    contract,
    NFT_EXCHANGE_ADDRESS,
    setStatus,
  ]);
};
