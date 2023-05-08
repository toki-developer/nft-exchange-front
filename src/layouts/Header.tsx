import { Toggle, ToggleItem } from "@tremor/react";
import { Web3Button } from "@web3modal/react";
import { useRouter } from "next/router";
import { pagesPath } from "src/libs/path/$path";

/**
 * @package
 */
export const Header = () => {
  return (
    <header className="flex relative items-center justify-between py-6 px-8">
      <p className="font-bold text-lg">NFT交換ツール</p>
      <TabMenu />
      <Web3Button />
    </header>
  );
};

const TabMenu = () => {
  const router = useRouter();

  const handleChange = (value: string) => {
    router.push(
      value == "approve" ? pagesPath.approve.$url() : pagesPath.$url()
    );
  };

  const isApprove = router.pathname == pagesPath.approve.$url().pathname;
  const defaultValue = isApprove ? "approve" : "create";

  return (
    <Toggle defaultValue={defaultValue} onValueChange={handleChange}>
      <ToggleItem value="create" text="オファー作成" />
      <ToggleItem value="approve" text="オファー承認" />
    </Toggle>
  );
};
