import { Icon } from "@tremor/react";
import { useState } from "react";
import { ClipboardDocument } from "src/components/Icon";
import { TextWithLine } from "src/components/Text";
import { pagesPath } from "src/libs/path/$path";
import type { Order } from "src/utils/contract";
import { useAccount } from "wagmi";

type Props = {
  order: Order;
};

/**
 * @package
 */
export const ModalContent = ({ order }: Props) => {
  return (
    <div>
      <p className="text-center text-xl font-bold">
        オファーの作成に成功しました
      </p>
      <OrderInfo order={order} />
      <Step />
    </div>
  );
};

const OrderInfo = ({ order }: Props) => {
  return (
    <section className="mt-8">
      <TextWithLine>作成済みオファー</TextWithLine>
      <section className="ml-4 mt-3">
        <h3 className="text-textcolor-sub">送るNFT</h3>
        {order.senderNFTContractAddress} #{order.senderNFTTokenId.toString()}
      </section>
      <section className="ml-4 mt-3">
        <h3 className="text-textcolor-sub">受け取るNFT</h3>
        {order.receiverNFTContractAddress} #
        {order.receiverNFTTokenId.toString()}
      </section>
    </section>
  );
};

const Step = () => {
  const [tooltipText, setTooltipText] = useState<
    "Click to Copy URL" | "Copied!"
  >("Click to Copy URL");
  const { address } = useAccount();

  const handleClickCopy = () => {
    navigator.clipboard
      .writeText(
        `${window.location.origin}${
          pagesPath.approve.$url().pathname
        }?sender=${address}`
      )
      .then(() => {
        setTooltipText("Copied!");
      });
  };

  const resetText = () => {
    setTooltipText("Click to Copy URL");
  };

  return (
    <section className="mt-8">
      <TextWithLine>オファー作成後の流れ</TextWithLine>
      <ol className="ml-4 mt-3 space-y-3">
        <li>
          <NumCircle num={1} />
          <span className="relative">
            交換相手に
            <Icon
              className=" [&>div]:bg-primary py-0 px-1 group"
              icon={() => (
                <span className="cursor-pointer text-textcolor-main group-hover:text-primary transition-all">
                  URL
                </span>
              )}
              onMouseLeave={resetText}
              onClick={handleClickCopy}
              tooltip={tooltipText}
            />
            を送る
            <Icon
              className=" [&>div]:bg-primary absolute top-1/2 -translate-y-1/2 group"
              icon={() => (
                <ClipboardDocument className=" text-textcolor-main cursor-pointer group-hover:text-primary transition-all" />
              )}
              onMouseLeave={resetText}
              onClick={handleClickCopy}
              tooltip={tooltipText}
            />
          </span>
        </li>
        <li>
          <NumCircle num={2} />
          交換相手がオファーを承認する
        </li>
        <li>
          <NumCircle num={3} />
          NFTの交換完了 🎉
        </li>
      </ol>
    </section>
  );
};

const NumCircle = ({ num }: { num: number }) => {
  return (
    <span className="border-textcolor-main border-2 rounded-full w-6 h-6 inline-flex justify-center items-center mr-2">
      {num}
    </span>
  );
};
