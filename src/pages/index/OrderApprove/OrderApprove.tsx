import { useRouter } from "next/router";

import { OrderApproveContentWrapper } from "./OrderApproveContent";

/**
 * @package
 */
export const OrderApprove = () => {
  const router = useRouter();
  const sender = router.query.sender as `0x${string}` | null;

  if (sender) {
    return <OrderApproveContentWrapper sender={sender} />;
  }

  //TODO: sender入力フォーム
  return <div>sender入力フォームを後で作る</div>;
};
