import type { ButtonHTMLAttributes } from "react";
import type { Order } from "src/utils/contract";
import { useWriteApproveOrder } from "src/utils/contract";
import type { Address } from "wagmi";
import { useTransaction } from "wagmi";

type Props = {
  isApproved: boolean;
  order: Order;
  sender: Address;
};

export const ExchangeButton = ({ isApproved, order, sender }: Props) => {
  if (!isApproved) {
    return <Button disabled={true} />;
  }
  return (
    <ExchangeActiveButton
      isApproved={isApproved}
      order={order}
      sender={sender}
    />
  );
};

const ExchangeActiveButton = ({ order, sender }: Props) => {
  const { data, write } = useWriteApproveOrder([
    order.senderNFTContractAddress,
    order.senderNFTTokenId,
    order.receiverNFTContractAddress,
    order.receiverNFTTokenId,
    sender,
  ]);

  useTransaction({
    hash: data?.hash,
    onSuccess: async (tx) => {
      const res = await tx.wait();
      if (res.status == 1) {
        //TODO: 成功したことを伝える
      }
    },
    onError: async (e) => {
      console.error(e);
      //TODO: エラー時の処理
    },
  });

  const handleApproveOrder = () => {
    if (write) {
      write();
    } else {
      //TODO: writeがない場合の処理(エラーとか)
    }
  };

  return <Button onClick={handleApproveOrder} />;
};

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button {...props}>交換</button>;
};
