import { Icon } from "@tremor/react";
import type { BigNumber } from "ethers";
import { useState } from "react";
import { ArrowPath, ClipboardDocument } from "src/components/Icon";
import type { useGetOrder } from "src/utils/contract";
import { addShortStr } from "src/utils/string";
import type { Address } from "wagmi";

import { ActionField } from "./ActionField/ActionField";
import { useGetNftMetadata } from "./useGetNFTMetadata";

type Props = {
  order: NonNullable<ReturnType<typeof useGetOrder>["data"]>;
  sender: Address;
};

export const OrderApproveContent = ({ order, sender }: Props) => {
  const { nftMetadata } = useGetNftMetadata({ order });

  const [isFinishd, setIsFinished] = useState<boolean>(false);

  const handleComplete = () => {
    setIsFinished(true);
  };

  return (
    <div>
      <section>
        <h2>送るNFT</h2>
        <NFTInfo
          imgUrl={nftMetadata?.receiver.imgUrl}
          name={nftMetadata?.receiver.name}
          contractAddress={order.receiverNFTContractAddress}
          tokenId={order.receiverNFTTokenId}
        />
      </section>
      <div className="my-4 flex justify-center">
        <ArrowPath className="text-primary  md:w-10 h-10 rotate-90" />
      </div>
      <section>
        <h2>受け取るNFT</h2>
        <NFTInfo
          imgUrl={nftMetadata?.sender.imgUrl}
          name={nftMetadata?.sender.name}
          contractAddress={order.senderNFTContractAddress}
          tokenId={order.senderNFTTokenId}
        />
      </section>
      {isFinishd ? (
        <p className="text-center mt-8 text-lg font-bold">
          交換が完了しました 🎉
        </p>
      ) : (
        <ActionField
          order={order}
          sender={sender}
          onComplete={handleComplete}
        />
      )}
    </div>
  );
};

type NFTInfoProps = {
  imgUrl: string | undefined;
  name: string | undefined;
  contractAddress: Address;
  tokenId: BigNumber;
};

const NFTInfo = ({ contractAddress, imgUrl, name, tokenId }: NFTInfoProps) => {
  const [tooltipText, setTooltipText] = useState<"" | "Copied!">("");

  const handleClickCopy = () => {
    navigator.clipboard.writeText(contractAddress).then(() => {
      setTooltipText("Copied!");
    });
  };

  const resetText = () => {
    setTooltipText("");
  };

  return (
    <div className="flex mt-6">
      <div className="ml-6 flex-none">
        {imgUrl ? (
          <img
            className=" w-16 h-16 md:w-24 md:h-24"
            src={imgUrl}
            alt="receiver nft image"
          />
        ) : (
          <div className=" w-16 h-16 md:w-24 md:h-24" />
        )}
      </div>
      <div className="ml-4 md:ml-8 md:mt-3 min-w-0">
        {name ? (
          <p className="text-lg truncate">{name}</p>
        ) : (
          <div className=" h-7" />
        )}
        <p className="mt-1 flex">
          <Icon
            className=" [&>div]:bg-primary cursor-pointer group p-0"
            icon={() => (
              <span className="text-textcolor-main group-hover:text-primary transition-all flex gap-1">
                {addShortStr(contractAddress, 4)}
                <ClipboardDocument />
              </span>
            )}
            tooltip={tooltipText || contractAddress}
            onMouseLeave={resetText}
            onClick={handleClickCopy}
          />
          <span className="ml-2">#{tokenId.toString()}</span>
        </p>
      </div>
    </div>
  );
};
