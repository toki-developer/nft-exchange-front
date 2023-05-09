import type { ButtonHTMLAttributes } from "react";
import { BlueButton } from "src/components/Button/BlueButton";
import {
  useNFTContract,
  useNFTExchangeContractAddress,
} from "src/utils/contract";
import { useWriteApprove } from "src/utils/contract";
import { useTransaction } from "wagmi";

import { STATUS, useStatusContext } from "./StatusContext";
import { useFormValue } from "./useFormValue";

/**
 * @package
 */
export const ApproveButton = () => {
  const { status } = useFormValue();

  if (status !== STATUS.NO_APPROVED) {
    return <Button disabled />;
  }
  return <ApproveButtonImpl />;
};

const ApproveButtonImpl = () => {
  const { senderNFTContractAddress, senderNFTTokenId } = useFormValue();
  const { data, write } = useWriteApprove(
    senderNFTContractAddress,
    senderNFTTokenId
  );
  const contract = useNFTContract(senderNFTContractAddress);
  const NFT_EXCHANGE_ADDRESS = useNFTExchangeContractAddress();
  const inputStatus = useStatusContext();

  const handleApproveMyNFT = () => write?.();

  useTransaction({
    hash: data?.hash,
    onSuccess: async (tx) => {
      const res = await tx.wait();
      if (res.status == 1) {
        contract?.getApproved(senderNFTTokenId).then((res) => {
          if (res === NFT_EXCHANGE_ADDRESS) {
            inputStatus.setStatus(STATUS.APPROVED);
          } else {
            //TODO: 成功しているのに、approve先が違う場合
            inputStatus.setStatus(STATUS.NO_APPROVED);
          }
        });
      } else {
        //TODO: エラー時の処理
      }
    },
  });

  return <Button onClick={handleApproveMyNFT} />;
};

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <BlueButton {...props}>Approve</BlueButton>;
};
