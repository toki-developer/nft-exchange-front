import { Icon } from "@tremor/react";
import { useState } from "react";
import { ClipboardDocument } from "src/components/Icon";
import { TextWithLine } from "src/components/Text";
import { pagesPath } from "src/libs/path/$path";
import type { Order } from "src/utils/contract";
import { useAccount } from "wagmi";

import type { NFTMetadataList } from "./OrderRequestActionField";

type Props = {
  order: Order;
  title: string;
  nftMetadata: NFTMetadataList;
};

/**
 * @package
 */
export const ModalContent = ({ nftMetadata, order, title }: Props) => {
  return (
    <div>
      <p className="text-center text-base md:text-xl font-bold">{title}</p>
      <OrderInfo order={order} nftMetadata={nftMetadata} />
      <Step />
    </div>
  );
};

const OrderInfo = ({
  nftMetadata,
  order,
}: {
  order: Order;
  nftMetadata: NFTMetadataList;
}) => {
  const [tooltipText, setTooltipText] = useState<"" | "Copied!">("");

  const handleClickSender = () => {
    navigator.clipboard.writeText(order.senderNFTContractAddress).then(() => {
      setTooltipText("Copied!");
    });
  };

  const handleClickReceiver = () => {
    navigator.clipboard.writeText(order.receiverNFTContractAddress).then(() => {
      setTooltipText("Copied!");
    });
  };

  const resetText = () => {
    setTooltipText("");
  };

  return (
    <section className="mt-8">
      <TextWithLine className="text-sm md:text-base">
        作成済みオファー
      </TextWithLine>
      <div className="flex w-full">
        <section className="md:ml-4 mt-3 flex-1 min-w-0 px-2">
          <h3 className="text-textcolor-sub ml-2">送るNFT</h3>
          <div className="text-center mt-6">
            <img
              src={nftMetadata.sender?.imgUrl}
              className="w-16 h-16 md:w-24 md:h-24 mx-auto"
              alt="sender nft image"
            />
            <p className="mt-2 truncate">{nftMetadata.sender?.name ?? ""}</p>
            <p className="mt-1 flex items-center">
              <Icon
                className=" [&>div]:bg-primary cursor-pointer group flex-1 min-w-0"
                icon={() => (
                  <span className="text-textcolor-main group-hover:text-primary transition-all truncate">
                    {order.senderNFTContractAddress}
                  </span>
                )}
                tooltip={tooltipText || order.senderNFTContractAddress}
                onMouseLeave={resetText}
                onClick={handleClickSender}
              />
              <span>#{order.senderNFTTokenId.toString()}</span>
            </p>
          </div>
        </section>
        <section className="md:ml-4 mt-3 flex-1 min-w-0 px-2">
          <h3 className="text-textcolor-sub ml-2">受け取るNFT</h3>
          <div className="text-center mt-6">
            <img
              src={nftMetadata.receiver?.imgUrl}
              className="w-16 h-16 md:w-24 md:h-24 mx-auto"
              alt="receiver nft image"
            />
            <p className="mt-2 truncate">{nftMetadata.receiver?.name ?? ""}</p>
            <p className="mt-1 flex items-center px-4">
              <Icon
                className=" [&>div]:bg-primary cursor-pointer group flex-1 min-w-0"
                icon={() => (
                  <span className="text-textcolor-main group-hover:text-primary transition-all truncate">
                    {order.senderNFTContractAddress}
                  </span>
                )}
                tooltip={tooltipText || order.receiverNFTContractAddress}
                onMouseLeave={resetText}
                onClick={handleClickReceiver}
              />
              <span>#{order.receiverNFTTokenId.toString()}</span>
            </p>
          </div>
        </section>
      </div>
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
      <TextWithLine className="text-sm md:text-base">
        オファー作成後の流れ
      </TextWithLine>
      <ol className="md:ml-4 mt-3 space-y-3 text-sm md:text-base">
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
    <span className="border-textcolor-main border-2 rounded-full w-4 h-4 md:w-6 md:h-6 inline-flex justify-center items-center mr-2">
      {num}
    </span>
  );
};
