import { Card } from "@tremor/react";
import dynamic from "next/dynamic";
import type { PropsWithChildren } from "react";

const MainCardBlock = dynamic(() => import("./MainCardBlock"), { ssr: false });

/**
 * @package
 */
export const MainCard = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative">
      <MainCardBlock />
      <Card className="bg-gray-800 ring-gray-600">{children}</Card>
    </div>
  );
};
