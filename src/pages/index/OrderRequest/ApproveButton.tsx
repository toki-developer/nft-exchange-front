import type { ButtonHTMLAttributes } from "react";
import { useNFTExchangeContractAddress } from "src/utils/contract";

import { STATUS } from "./StatusContext";
import { useFormValue } from "./useFormValue";

/**
 * @package
 */
export const ApproveButton = () => {
  const { status } = useFormValue();

  if (status == STATUS.ERRPR) {
    return <Button disabled />;
  }
  return <ApproveButtonImpl />;
};

const ApproveButtonImpl = () => {
  const { senderNFTContractAddress, senderNFTTokenId } = useFormValue();
  // const contract = useNFTContract(senderNFTContractAddress);
  const nftExchangeContractAddress = useNFTExchangeContractAddress();

  const handleApproveMyNFT = async () => {
    // await contract
    //   ?.approve(nftExchangeContractAddress, senderNFTTokenId)
    //   .then(async (tx) => {
    //     //TODO: tx.hashを使ってトランザクションに飛べるようにする
    //     const res = await tx.wait();
    //     if (res.status == 1) {
    //       //TODO: トランザクションが成功したことを伝える
    //       // オーダー登録のボタンを押せるようにする or approvedの確認のリクエストを投げる
    //     } else {
    //       //TODO: 1以外の場合について調査
    //       // トランザクションが失敗したことを伝える
    //     }
    //   })
    //   .catch((e) => {
    //     //TODO: エラー発生時の処理を考える
    //     // 拒否した場合もここが呼ばれる
    //     console.error(e);
    //   });
  };

  return <Button onClick={handleApproveMyNFT} />;
};

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button {...props}>Approve</button>;
};
