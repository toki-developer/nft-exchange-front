import type { NextLayout } from "next";

import { Header } from "./Header";

/**
 * @package
 */
export const Layout: NextLayout = (page) => {
  return (
    <div className="bg-bgcolor text-textcolor-main">
      <Header />
      <main>{page}</main>
    </div>
  );
};
