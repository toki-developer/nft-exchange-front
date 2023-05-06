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
  const { data, status, write } = useWriteApprove(
    senderNFTContractAddress,
    senderNFTTokenId
  );
  const contract = useNFTContract(senderNFTContractAddress);
  const NFT_EXCHANGE_ADDRESS = useNFTExchangeContractAddress();
  const inputStatus = useStatusContext();

  const handleApproveMyNFT = () => write?.();

  //TODO: statusがsuccessじゃない時,dataがない時について調べる
  useEffect(() => {
    if (
      status == "success" &&
      inputStatus.status === STATUS.NO_APPROVED &&
      data
    ) {
      (async () => {
        const tx = await data.wait();
        if (tx.status == 1) {
          contract?.getApproved(senderNFTTokenId).then((res) => {
            if (res === NFT_EXCHANGE_ADDRESS) {
              inputStatus.setStatus(STATUS.APPROVED);
            } else {
              //TODO: 成功しているのに、approve先が違う場合
              inputStatus.setStatus(STATUS.NO_APPROVED);
            }
          });
        } else {
          //TODO: approve失敗の処理
        }
      })();
    }
  }, [
    status,
    NFT_EXCHANGE_ADDRESS,
    inputStatus,
    senderNFTTokenId,
    contract,
    data,
  ]);

  return <Button onClick={handleApproveMyNFT} />;
};

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button {...props}>Approve</button>;
};
