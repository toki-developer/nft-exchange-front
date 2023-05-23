import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useNFTContract } from "src/utils/contract";
import { useNetworkConst } from "src/utils/hooks";
import { logalert } from "src/utils/logalert";

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
  const { nftExchangeContractAddress } = useNetworkConst();

  const { setStatus, status } = useStatusContext();
  const [prevNFT, setPrevNFT] = useState<string>("");

  const isNoError = Object.keys(errors).length == 0;
  const isFullInput =
    senderNFTContractAddress &&
    senderNFTTokenId &&
    receiverNFTContractAddress &&
    receiverNFTTokenId
      ? true
      : false;

  useEffect(() => {
    if (isNoError && isFullInput) {
      if (prevNFT !== `${senderNFTContractAddress}-${senderNFTTokenId}`) {
        contract
          ?.getApproved(senderNFTTokenId)
          .then((res) => {
            if (res === nftExchangeContractAddress) {
              setStatus(STATUS.APPROVED);
            } else {
              setStatus(STATUS.NO_APPROVED);
            }
            setPrevNFT(`${senderNFTContractAddress}-${senderNFTTokenId}`);
          })
          .catch((e) => {
            console.error(e);
            logalert(e.message);
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
    isNoError,
    senderNFTContractAddress,
    senderNFTTokenId,
    status,
    prevNFT,
    contract,
    nftExchangeContractAddress,
    setStatus,
  ]);
};
