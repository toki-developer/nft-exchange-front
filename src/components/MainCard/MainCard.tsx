import { Card } from "@tremor/react";
import type { PropsWithChildren } from "react";

/**
 * @package
 */
export const MainCard = ({ children }: PropsWithChildren) => {
  return <Card className="bg-gray-800 ring-gray-600 ">{children}</Card>;
};
