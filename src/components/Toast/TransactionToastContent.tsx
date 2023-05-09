import { useEtherscanURL } from "src/utils/contract";

type Props = {
  tx: string;
};

/**
 * @package
 */
export const TransactionToastContent = ({ tx }: Props) => {
  const etherscanURL = useEtherscanURL();

  return (
    <p>
      <span className="text-sm">Transaction:</span>
      <a
        href={`${etherscanURL}/tx/${tx}`}
        className="underline ml-2 font-bold"
        target="_blank"
        rel="noreferrer"
      >
        {tx.replace(/(.{7}).*(.{7})/, "$1...$2")}
      </a>
    </p>
  );
};
