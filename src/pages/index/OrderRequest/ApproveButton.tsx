import type { ButtonHTMLAttributes } from "react";
import { useEffect } from "react";
import {
  useNFTContract,
  useNFTExchangeContractAddress,
} from "src/utils/contract";
import { useWriteApprove } from "src/utils/contract";

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
  const { status, write } = useWriteApprove(
    senderNFTContractAddress,
    senderNFTTokenId
  );
  const contract = useNFTContract(senderNFTContractAddress);
  const NFT_EXCHANGE_ADDRESS = useNFTExchangeContractAddress();
  const inputStatus = useStatusContext();

  const handleApproveMyNFT = () => write?.();

  useEffect(() => {
    if (status == "success" && inputStatus.status === STATUS.NO_APPROVED) {
      contract?.getApproved(senderNFTTokenId).then((res) => {
        if (res === NFT_EXCHANGE_ADDRESS) {
          inputStatus.setStatus(STATUS.APPROVED);
        } else {
          inputStatus.setStatus(STATUS.NO_APPROVED);
        }
      });
    }
  }, [status, NFT_EXCHANGE_ADDRESS, inputStatus, senderNFTTokenId, contract]);

  return <Button onClick={handleApproveMyNFT} />;
};

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button {...props}>Approve</button>;
};
