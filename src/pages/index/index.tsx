import type { FC } from "react";

import { OrderApprove } from "./OrderApprove";
import { OrderRequest } from "./OrderRequest";

export const Index: FC = () => {
  return (
    <div>
      <OrderRequest />
      <OrderApprove />
    </div>
  );
};
