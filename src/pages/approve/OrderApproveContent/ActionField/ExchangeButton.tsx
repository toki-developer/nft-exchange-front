import { type ButtonHTMLAttributes, useState } from "react";
import { toast } from "react-hot-toast";
import { BlueButton } from "src/components/Button/BlueButton";
import { TransactionToastContent } from "src/components/Toast";
import type { Order } from "src/utils/contract";
import { useWriteApproveOrder } from "src/utils/contract";
import type { Address } from "wagmi";
import { useTransaction } from "wagmi";

type Props = {
  isApproved: boolean;
  order: Order;
  sender: Address;
  onComplete: () => void;
};

export const ExchangeButton = ({
  isApproved,
  onComplete,
  order,
  sender,
}: Props) => {
  if (!isApproved) {
    return <Button disabled={true} />;
  }
  return (
    <ExchangeActiveButton
      isApproved={isApproved}
      order={order}
      sender={sender}
      onComplete={onComplete}
    />
  );
};

const ExchangeActiveButton = ({ onComplete, order, sender }: Props) => {
  const { data, write } = useWriteApproveOrder([
    order.senderNFTContractAddress,
    order.senderNFTTokenId,
    order.receiverNFTContractAddress,
    order.receiverNFTTokenId,
    sender,
  ]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useTransaction({
    hash: data?.hash,
    onSuccess: async (tx) => {
      const txPromise = tx
        .wait()
        .then((res) => {
          if (res.status == 1) {
            onComplete();
          } else {
            //TODO: エラー時の処理
          }
        })
        .catch((e) => {
          //TODO: エラー時の処理
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
    onError: async (e) => {
      console.error(e);
      //TODO: エラー時の処理
    },
  });

  const handleApproveOrder = () => {
    if (write) {
      setIsLoading(true);
      write();
    } else {
      //TODO: writeがない場合の処理(エラーとか)
    }
  };

  return <Button disabled={isLoading} onClick={handleApproveOrder} />;
};

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <BlueButton {...props}>オファー承認</BlueButton>;
};
