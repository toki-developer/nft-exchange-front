import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";
import { useNetwork } from "wagmi";

/**
 * @package
 */
const RightMenu = () => {
  const { chain } = useNetwork();

  return (
    <div className="flex items-center gap-3 justify-end">
      <div className="hidden md:block">
        {chain?.unsupported ? null : <Web3NetworkSwitch />}
      </div>
      {chain?.unsupported ? (
        <Web3NetworkSwitch />
      ) : (
        <div>
          <div className="hidden md:block">
            <Web3Button />
          </div>
          <div className="md:hidden">
            <Web3Button avatar="hide" icon="hide" />
          </div>
        </div>
      )}
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default RightMenu;
