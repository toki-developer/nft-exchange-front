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

  const { data, status, write } = useWriteCreateOrder([
    senderNFTContractAddress,
    senderNFTTokenId,
    receiverNFTContractAddress,
    receiverNFTTokenId,
  ]);

  data;
  status;

  return <Button onClick={write} />;
};

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button {...props}>オーダー登録</button>;
};
