import type { ButtonHTMLAttributes } from "react";
import { useWriteCreateOrder } from "src/utils/contract";

import { STATUS } from "./StatusContext";
import { useFormValue } from "./useFormValue";

/**
 * @package
 */
export const OrderButton = () => {
  const { status } = useFormValue();

  if (status !== STATUS.APPROVED) {
    return <Button disabled />;
  }
  return <OrderButtonImpl />;
};

const OrderButtonImpl = () => {
  const {
    receiverNFTContractAddress,
    receiverNFTTokenId,
    senderNFTContractAddress,
    senderNFTTokenId,
  } = useFormValue();

  //TODO; オーダー登録の実装
  const { data, error, isError, isSuccess, status, write } =
    useWriteCreateOrder([
      senderNFTContractAddress,
      senderNFTTokenId,
      receiverNFTContractAddress,
      receiverNFTTokenId,
    ]);
  data;
  error;
  isError;
  isSuccess;
  status;
  return <Button onClick={write} />;
};

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button {...props}>オーダー登録</button>;
};
