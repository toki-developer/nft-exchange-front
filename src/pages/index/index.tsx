import type { FC } from "react";
import { useAccount, useContract, useSigner } from "wagmi";

export const Index: FC = () => {
  const account = useAccount();
  const contract = useContract();
  const signer = useSigner();
  account;
  contract;
  signer;

  return <div>Hello Index Page</div>;
};
