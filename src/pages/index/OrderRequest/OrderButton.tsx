import type { ButtonHTMLAttributes } from "react";
import { useGetOrder, useWriteCreateOrder } from "src/utils/contract";
import type { Address } from "wagmi";
import { useAccount, useTransaction } from "wagmi";

import { STATUS } from "./StatusContext";
import { useFormValue } from "./useFormValue";

/**
 * @package
 */
export const OrderButton = () => {
  const { status } = useFormValue();
  const { address } = useAccount();

  if (status !== STATUS.APPROVED || !address) {
    return <Button disabled />;
  }
  return <OrderButtonImpl account={address} />;
};

const OrderButtonImpl = ({ account }: { account: Address }) => {
  const {
    receiverNFTContractAddress,
    receiverNFTTokenId,
    senderNFTContractAddress,
    senderNFTTokenId,
  } = useFormValue();

  const { data, write } = useWriteCreateOrder([
    senderNFTContractAddress,
    senderNFTTokenId,
    receiverNFTContractAddress,
    receiverNFTTokenId,
  ]);

  const { refetch } = useGetOrder(account);

  useTransaction({
    hash: data?.hash,
    onSuccess: async (tx) => {
      const res = await tx.wait();
      if (res.status == 1) {
        refetch()
          .then((res) => {
            //TODO: 結果をUIに表示 + 共有用のURL作成
            // console.log("success");
            // console.log(res);
            res;
          })
          .catch((e) => {
            //TODO: エラーのときの処理(再フェッチ)
            console.error(e);
          });
      } else {
        //TODO: オーダー登録に失敗した時の処理
      }
    },
  });

  const handleCreateOrder = () => write?.();

  return <Button onClick={handleCreateOrder} />;
};

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button {...props}>オーダー登録</button>;
};
