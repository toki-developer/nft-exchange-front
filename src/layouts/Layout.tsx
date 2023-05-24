import type { NextLayout } from "next";

import { Header } from "./Header";
import { HowToUse } from "./HowToUse";

/**
 * @package
 */
export const Layout: NextLayout = (page) => {
  return (
    <div>
      <Header />
      <main className="max-w-xl mx-auto mt-2 md:mt-16">{page}</main>
      <HowToUse />
    </div>
  );
};
