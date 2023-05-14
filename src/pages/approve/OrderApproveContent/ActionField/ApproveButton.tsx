import { useState } from "react";
import { toast } from "react-hot-toast";
import { BlueButton } from "src/components/Button";
import { TransactionToastContent } from "src/components/Toast";
import type { Order, useGetApprove } from "src/utils/contract";
import { useWriteApprove } from "src/utils/contract";
import { useTransaction } from "wagmi";

type Props = {
  isApproved: boolean;
  onWriteApprove: ReturnType<typeof useGetApprove>["refetch"];
  order: Order;
};

export const ApproveButton = ({ isApproved, onWriteApprove, order }: Props) => {
  const { data, write } = useWriteApprove({
    nftAddress: order.receiverNFTContractAddress,
    nftTokenId: order.receiverNFTTokenId,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useTransaction({
    hash: data?.hash,
    onSuccess: async (tx) => {
      const txPromise = tx
        .wait()
        .then(async (res) => {
          if (res.status == 1) {
            await onWriteApprove();
          } else {
            //TODO: エラー時の処理
          }
        })
        .catch((e) => {
          //TODO: エラーの時の処理
          console.error(e);
        });
      toast.promise(txPromise, {
        loading: <TransactionToastContent tx={tx.hash} />,
        success: <p>Approveに成功しました</p>,
        error: <p>Approveに失敗しました</p>,
      });
      await txPromise;
      setIsLoading(false);
    },
    onError: (e) => {
      //TODO: エラーの処理
      console.error(e);
      setIsLoading(false);
    },
  });
  const handleApproveMyNFT = () => {
    setIsLoading(true);
    write?.();
  };

  return (
    <BlueButton onClick={handleApproveMyNFT} disabled={isApproved || isLoading}>
      Approve
    </BlueButton>
  );
};
