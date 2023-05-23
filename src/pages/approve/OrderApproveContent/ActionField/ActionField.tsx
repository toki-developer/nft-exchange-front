import { useState } from "react";
import type { Order } from "src/utils/contract";
import { useGetApprove } from "src/utils/contract";
import { useNetworkConst } from "src/utils/hooks";
import type { Address } from "wagmi";

import { ApproveButton } from "./ApproveButton";
import { ExchangeButton } from "./ExchangeButton";

type Props = {
  order: Order;
  sender: Address;
  onComplete: () => void;
};

export const ActionField = ({ onComplete, order, sender }: Props) => {
  const { receiverNFTContractAddress, receiverNFTTokenId } = order;
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const { nftExchangeContractAddress } = useNetworkConst();

  const { refetch } = useGetApprove({
    nftAddress: receiverNFTContractAddress,
    nftTokenId: receiverNFTTokenId,
    onSuccess: (data) => {
      setIsApproved(nftExchangeContractAddress == data);
    },
  });

  return (
    <div className="flex justify-center gap-6 mt-8 ">
      <ApproveButton
        isApproved={isApproved}
        onWriteApprove={refetch}
        order={order}
      />
      <ExchangeButton
        isApproved={isApproved}
        order={order}
        sender={sender}
        onComplete={onComplete}
      />
    </div>
  );
};
