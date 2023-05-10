import type { PropsWithChildren } from "react";

type Props = {
  tag?: "h2";
  className?: string;
  borderColor?: string;
};

/**
 * @package
 */
export const TextWithLine = ({
  borderColor,
  children,
  className,
  tag = "h2",
}: PropsWithChildren<Props>) => {
  const TAG = tag;
  return (
    <TAG className={`flex items-center gap-2 ${className}`}>
      <span
        className={`flex-1 w-full border-b-2 ${
          borderColor ? borderColor : "border-gray-600"
        }`}
      />
      {children}
      <span
        className={`flex-1 w-full border-b-2 ${
          borderColor ? borderColor : "border-gray-600"
        }`}
      />
    </TAG>
  );
};
