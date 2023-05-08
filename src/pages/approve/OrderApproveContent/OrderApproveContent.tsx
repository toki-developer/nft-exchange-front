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

  return (
    <div>
      <div>
        <p>受け取るNFT</p>
        <p>
          {senderNFTContractAddress}#{senderNFTTokenId.toString()}
        </p>
        <p>送るNFT</p>
        <p>
          {receiverNFTContractAddress}#{receiverNFTTokenId.toString()}
        </p>
      </div>
      <ActionField order={order} sender={sender} />
    </div>
  );
};
