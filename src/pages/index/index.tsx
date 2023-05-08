import { useRouter } from "next/router";
import type { FC } from "react";
import { useEffect } from "react";
import { useState } from "react";

import { OrderApprove } from "./OrderApprove";
import { OrderRequest } from "./OrderRequest";

export const Index: FC = () => {
  const [pageType, setPageType] = useState<"approve" | "create">("create");
  const router = useRouter();
  const { type } = router.query;

  useEffect(() => {
    if (router.isReady) {
      if (type == "approve") {
        setPageType("approve");
      }
    }
  }, [type, router.isReady]);

  return (
    <div>
      <div>
        <button onClick={() => setPageType("create")}>オーダー作成</button>
        <button onClick={() => setPageType("approve")}>オーダー承認</button>
      </div>
      {pageType == "approve" ? <OrderApprove /> : <OrderRequest />}
    </div>
  );
};
