import { type ButtonHTMLAttributes, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BlueButton } from "src/components/Button/BlueButton";
import { TransactionToastContent } from "src/components/Toast";
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

  const { data, isError, write } = useWriteCreateOrder([
    senderNFTContractAddress,
    senderNFTTokenId,
    receiverNFTContractAddress,
    receiverNFTTokenId,
  ]);

  const { refetch } = useGetOrder(account);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useTransaction({
    hash: data?.hash,
    onSuccess: async (tx) => {
      const txWait = tx.wait();
      toast.promise(txWait, {
        loading: <TransactionToastContent tx={tx.hash} />,
        success: <p>オファー作成に成功しました</p>,
        error: <p>オファー作成に失敗しました</p>,
      });
      await txWait
        .then((res) => {
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
        })
        .catch((e) => {
          //TODO: エラーの時の処理
          console.error(e);
        });
      setIsLoading(false);
    },
    onError: (e) => {
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

  const handleCreateOrder = () => {
    setIsLoading(true);
    write?.();
  };

  return <Button disabled={isLoading} onClick={handleCreateOrder} />;
};

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <BlueButton {...props}>オファー作成</BlueButton>;
};
