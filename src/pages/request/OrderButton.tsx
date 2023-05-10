import { ethers } from "ethers";
import { type ButtonHTMLAttributes, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BlueButton } from "src/components/Button/BlueButton";
import { useModal } from "src/components/Modal";
import { TransactionToastContent } from "src/components/Toast";
import { useGetOrder, useWriteCreateOrder } from "src/utils/contract";
import type { Address } from "wagmi";
import { useAccount, useTransaction } from "wagmi";

import { ModalContent } from "./ModalContent";
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

  const { data: orderData, refetch } = useGetOrder(account, false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { Modal, handleOpen } = useModal();

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
                if (
                  res.status == "success" ||
                  orderData?.receiverNFTContractAddress !==
                    ethers.constants.AddressZero
                ) {
                  handleOpen();
                }
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

  return (
    <>
      {orderData ? (
        <Modal>
          <ModalContent order={orderData} />
        </Modal>
      ) : null}
      <Button disabled={isLoading} onClick={handleCreateOrder} />
    </>
  );
};

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <BlueButton {...props}>オファー作成</BlueButton>;
};
