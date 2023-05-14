import { alchemySepolia } from "src/libs/alchemy/alchemy";
// import { useNetwork } from "wagmi";

export const useAlchemy = () => {
  //   const { chain } = useNetwork();

  return alchemySepolia;
};
