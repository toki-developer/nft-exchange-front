import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useNetworkConst } from "src/utils/hooks";
import { logalert } from "src/utils/logalert";
import { imgStr } from "src/utils/string";

import type { NFTForm } from "./type";

type NFTMetadata =
  | {
      imgUrl: string | undefined;
      name: string | undefined;
    }
  | undefined;

export const useGetNftMetadata = () => {
  const [senderNFT, setSenderNFT] = useState<NFTMetadata>(undefined);
  const [receiverNFT, setReceiverNFT] = useState<NFTMetadata>(undefined);

  const {
    formState: { errors },
    watch,
  } = useFormContext<NFTForm>();
  const senderNFTContractAddress = watch("senderNFTContractAddress");
  const senderNFTTokenId = watch("senderNFTTokenId");
  const receiverNFTContractAddress = watch("receiverNFTContractAddress");
  const receiverNFTTokenId = watch("receiverNFTTokenId");
  const { alchemy } = useNetworkConst();

  const [prevSenderNFT, setPrevSenderNFT] = useState<string>("");
  const [prevReceiverNFT, setPrevReceiverNFT] = useState<string>("");

  const isSenderValid =
    senderNFTContractAddress &&
    senderNFTTokenId &&
    !errors.senderNFTContractAddress &&
    !errors.senderNFTTokenId
      ? true
      : false;

  const isReceiverValid =
    receiverNFTContractAddress &&
    receiverNFTTokenId &&
    !errors.receiverNFTContractAddress &&
    !errors.receiverNFTTokenId
      ? true
      : false;

  useEffect(() => {
    const isSame =
      prevReceiverNFT === `${receiverNFTContractAddress}-${receiverNFTTokenId}`;

    if (!isReceiverValid || isSame) {
      return;
    }
    setPrevReceiverNFT(`${receiverNFTContractAddress}-${receiverNFTTokenId}`);
    setReceiverNFT(undefined);
    alchemy.nft
      .getNftMetadata(receiverNFTContractAddress, receiverNFTTokenId)
      .then((res) => {
        setReceiverNFT({
          imgUrl: imgStr(res.rawMetadata?.image),
          name: res.rawMetadata?.name,
        });
      })
      .catch((e) => {
        console.error(e);
        logalert(e.message);
      });
  }, [
    isReceiverValid,
    receiverNFTContractAddress,
    receiverNFTTokenId,
    prevReceiverNFT,
    alchemy,
  ]);

  useEffect(() => {
    const isSame =
      prevSenderNFT === `${senderNFTContractAddress}-${senderNFTTokenId}`;

    if (!isSenderValid || isSame) {
      return;
    }
    setPrevSenderNFT(`${senderNFTContractAddress}-${senderNFTTokenId}`);
    setSenderNFT(undefined);
    alchemy.nft
      .getNftMetadata(senderNFTContractAddress, senderNFTTokenId)
      .then((res) => {
        setSenderNFT({
          imgUrl: imgStr(res.rawMetadata?.image),
          name: res.rawMetadata?.name,
        });
      })
      .catch((e) => {
        console.error(e);
        logalert(e.message);
      });
  }, [
    alchemy,
    isSenderValid,
    prevSenderNFT,
    senderNFTContractAddress,
    senderNFTTokenId,
  ]);

  return { senderNFT, receiverNFT };
};
