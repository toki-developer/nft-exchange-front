import { Toggle, ToggleItem } from "@tremor/react";
import { Web3Button } from "@web3modal/react";
import { useRouter } from "next/router";
import { useState } from "react";
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

  const isApprove = router.pathname == pagesPath.approve.$url().pathname;
  const defaultValue = isApprove ? "approve" : "create";
  const [value, setValue] = useState<"create" | "approve">(defaultValue);

  const handleChange = (value: string) => {
    setValue(value as "create" | "approve");
    router.push(
      value == "approve" ? pagesPath.approve.$url() : pagesPath.$url()
    );
  };

  return (
    <Toggle
      value={value}
      onValueChange={handleChange}
      className="bg-gray-800 font-bold"
    >
      <ToggleItem
        value="create"
        text="オファー作成"
        className={value == "create" ? "bg-primary text-white ring-0" : ""}
      />
      <ToggleItem
        value="approve"
        text="オファー承認"
        className={value == "approve" ? "bg-primary text-white ring-0" : ""}
      />
    </Toggle>
  );
};
