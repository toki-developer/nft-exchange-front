import { useNetworkConst } from "src/utils/hooks";

type Props = {
  tx: string;
};

/**
 * @package
 */
export const TransactionToastContent = ({ tx }: Props) => {
  const { blockexplorerPrefix } = useNetworkConst();

  return (
    <p>
      <span className="text-sm">Transaction:</span>
      <a
        href={`${blockexplorerPrefix}/tx/${tx}`}
        className="underline ml-2 font-bold"
        target="_blank"
        rel="noreferrer"
      >
        {tx.replace(/(.{7}).*(.{7})/, "$1...$2")}
      </a>
    </p>
  );
};
