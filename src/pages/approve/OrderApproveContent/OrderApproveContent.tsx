import { useState } from "react";
import { ArrowPath } from "src/components/Icon";
import type { useGetOrder } from "src/utils/contract";
import type { Address } from "wagmi";

import { ActionField } from "./ActionField/ActionField";

type Props = {
  order: NonNullable<ReturnType<typeof useGetOrder>["data"]>;
  sender: Address;
};

export const OrderApproveContent = ({ order, sender }: Props) => {
  const {
    receiverNFTContractAddress,
    receiverNFTTokenId,
    senderNFTContractAddress,
    senderNFTTokenId,
  } = order;

  const [isFinishd, setIsFinished] = useState<boolean>(false);

  const handleComplete = () => {
    setIsFinished(true);
  };

  return (
    <div>
      <section>
        <h2>送るNFT</h2>
        {receiverNFTContractAddress} #{receiverNFTTokenId.toString()}
      </section>
      <div className="my-4 flex justify-center">
        <ArrowPath className="text-primary w-10 h-10 rotate-90" />
      </div>
      <section>
        <h2>受け取るNFT</h2>
        {senderNFTContractAddress} #{senderNFTTokenId.toString()}
      </section>
      {isFinishd ? (
        <p className="text-center mt-8 text-lg font-bold">
          交換が完了しました 🎉
        </p>
      ) : (
        <ActionField
          order={order}
          sender={sender}
          onComplete={handleComplete}
        />
      )}
    </div>
  );
};
