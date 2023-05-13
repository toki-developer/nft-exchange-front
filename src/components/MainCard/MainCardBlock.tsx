import { Card } from "@tremor/react";
import { Web3NetworkSwitch } from "@web3modal/react";
import { useNetwork } from "wagmi";

const MainCardBlock = () => {
  const { chain } = useNetwork();

  if (chain?.unsupported) {
    return (
      <Card className="w-full h-full ring-gray-600 flex justify-center items-center bg-black absolute z-10 bg-opacity-70">
        <Web3NetworkSwitch />
      </Card>
    );
  }
  return null;
};

// eslint-disable-next-line import/no-default-export
export default MainCardBlock;
