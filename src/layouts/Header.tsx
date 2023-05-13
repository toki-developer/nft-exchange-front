import { Toggle, ToggleItem } from "@tremor/react";
import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { pagesPath } from "src/libs/path/$path";
import { type Address, useNetwork } from "wagmi";

/**
 * @package
 */
export const Header = () => {
  return (
    <header className="grid grid-cols-3 py-6 px-8">
      <p className="font-bold text-lg ">NFT交換ツール</p>
      <div className="flex justify-center">
        <TabMenu />
      </div>
      <RightMenu />
    </header>
  );
};

const RightMenu = () => {
  const { chain } = useNetwork();

  return (
    <div className="flex items-center gap-3 justify-end">
      <Web3NetworkSwitch />
      {chain?.unsupported ? <Web3Button /> : <Web3Button />}
    </div>
  );
};

const TabMenu = () => {
  const router = useRouter();

  const isApprove = router.pathname == pagesPath.approve.$url().pathname;
  const defaultValue = isApprove ? "approve" : "create";
  const [value, setValue] = useState<"create" | "approve">(defaultValue);

  const handleChange = (value: string) => {
    setValue(value as "create" | "approve");
    const sender = router.query.sender as Address;
    const query = sender ? { sender } : undefined;
    router.push(
      value == "approve"
        ? pagesPath.approve.$url({ query })
        : pagesPath.$url({ query })
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
