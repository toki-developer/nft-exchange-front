import type { Order } from "src/utils/contract";
import { useWriteApprove } from "src/utils/contract";
import { useTransaction } from "wagmi";

type Props = {
  isApproved: boolean;
  onWriteApprove: () => void;
  order: Order;
};

export const ApproveButton = ({ isApproved, onWriteApprove, order }: Props) => {
  const { data, write } = useWriteApprove({
    nftAddress: order.receiverNFTContractAddress,
    nftTokenId: order.receiverNFTTokenId,
  });

  useTransaction({
    hash: data?.hash,
    onSuccess: async (tx) => {
      const res = await tx.wait();
      if (res.status == 1) {
        onWriteApprove();
      } else {
        //TODO: オーダー登録に失敗した時の処理
      }
    },
  });
  const handleApproveMyNFT = () => write?.();

  return (
    <button onClick={handleApproveMyNFT} disabled={isApproved}>
      NFTを承認する
    </button>
  );
};
