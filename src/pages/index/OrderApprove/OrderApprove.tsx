import { useRouter } from "next/router";
import { useGetOrder } from "src/utils/contract";

/**
 * @package
 */
export const OrderApprove = () => {
  const router = useRouter();
  const sender = router.query.sender as `0x0${string}` | null;

  return <div>{sender ? <OrderCheckField sender={sender} /> : null}</div>;
};

const OrderCheckField = ({ sender }: { sender: `0x0${string}` }) => {
  const { data, error, isLoading } = useGetOrder(sender);
  return (
    <div>
      <p>{data?.orderApprover}</p>
      <p>{data?.receiverNFTContractAddress}</p>
      <p>{data?.receiverNFTTokenId.toString()}</p>
    </div>
  );
};
