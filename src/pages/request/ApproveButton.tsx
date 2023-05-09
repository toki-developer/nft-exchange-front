import { type ButtonHTMLAttributes, useState } from "react";
import { toast } from "react-hot-toast";
import { BlueButton } from "src/components/Button/BlueButton";
import { TransactionToastContent } from "src/components/Toast";
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

  if (status == STATUS.NO_APPROVED) {
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const contract = useNFTContract(senderNFTContractAddress);
  const NFT_EXCHANGE_ADDRESS = useNFTExchangeContractAddress();
  const inputStatus = useStatusContext();

  const handleApproveMyNFT = () => {
    setIsLoading(true);
    write?.();
  };

  useTransaction({
    hash: data?.hash,
    onSuccess: async (tx) => {
      const txWait = tx.wait();
      toast.promise(txWait, {
        loading: <TransactionToastContent tx={tx.hash} />,
        success: <p>Approveに成功しました</p>,
        error: <p>Approveに失敗しました</p>,
      });
      const res = await txWait;
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
      setIsLoading(false);
    },
    onError: (e) => {
      //TODO: エラーの処理
      console.error(e);
      setIsLoading(false);
    },
  });

  return <Button disabled={isLoading} onClick={handleApproveMyNFT} />;
};

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <BlueButton {...props}>Approve</BlueButton>;
};
