import { Toggle, ToggleItem } from "@tremor/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { pagesPath } from "src/libs/path/$path";
import { type Address } from "wagmi";

/**
 * @package
 */

export const TabMenu = () => {
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
