import { type ButtonHTMLAttributes, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BlueButton } from "src/components/Button/BlueButton";
import { TransactionToastContent } from "src/components/Toast";
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
  const { data, isError, write } = useWriteApprove({
    nftAddress: senderNFTContractAddress,
    nftTokenId: senderNFTTokenId,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
      await txWait
        .then((res) => {
          if (res.status == 1) {
            inputStatus.setStatus(STATUS.APPROVED);
          } else {
            //TODO: エラー時の処理
          }
        })
        .catch((e) => {
          //TODO: エラーの時の処理
          console.error(e);
        });
      setIsLoading(false);
    },
    onError: (e) => {
      //TODO: エラーの処理
      console.error(e);
      setIsLoading(false);
    },
  });

  //metamaskのrejectをキャッチ
  useEffect(() => {
    if (isError) {
      setIsLoading(false);
    }
  }, [isError]);

  return <Button disabled={isLoading} onClick={handleApproveMyNFT} />;
};

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <BlueButton {...props}>Approve</BlueButton>;
};
