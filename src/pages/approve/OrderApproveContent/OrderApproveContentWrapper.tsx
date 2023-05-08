import { constants } from "ethers";
import { useGetOrder } from "src/utils/contract";

import { OrderApproveContent } from "./OrderApproveContent";
import { OrderNotFound } from "./OrderNotFound";

/**
 * @package
 */
export const OrderApproveContentWrapper = ({
  sender,
}: {
  sender: `0x${string}`;
}) => {
  const { data, error, isLoading } = useGetOrder(sender);

  if (error) {
    //TODO: エラー時のUI
  }

  if (isLoading) {
    //TODO: ローディング時のUI
  }

  if (!data || data.senderNFTContractAddress == constants.AddressZero) {
    return <OrderNotFound />;
  }

  return <OrderApproveContent order={data} sender={sender} />;
};
