import { useRouter } from "next/router";
import { MainCard } from "src/components/MainCard";

import { OrderApproveContentWrapper } from "./OrderApproveContent";

/**
 * @package
 */
export const OrderApprove = () => {
  const router = useRouter();
  const sender = router.query.sender as `0x${string}` | null;

  if (sender) {
    return (
      <MainCard>
        <OrderApproveContentWrapper sender={sender} />
      </MainCard>
    );
  }

  return (
    <MainCard>
      <p>オファー作成者からURLを共有してもらってください</p>
    </MainCard>
  );
};
