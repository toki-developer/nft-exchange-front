import dynamic from "next/dynamic";

import { TabMenu } from "./TabMenu";

const RightMenu = dynamic(() => import("./RightMenu"), { ssr: false });

/**
 * @package
 */
export const Header = () => {
  return (
    <header className="grid px-4 py-3  md:py-6 md:px-8 grid-cols-2 md:grid-cols-3 grid-rows-2 md:grid-rows-1 gap-y-8">
      <p className="font-bold text-sm md:text-lg flex items-center">
        NFT交換ツール
      </p>
      <div className="flex justify-center col-span-2 md:col-span-1 row-start-2 md:row-start-auto">
        <TabMenu />
      </div>
      <div className="col-start-2 md:col-start-3">
        <RightMenu />
      </div>
    </header>
  );
};
