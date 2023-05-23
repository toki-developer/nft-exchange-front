import { useEffect, useState } from "react";
import type { useGetOrder } from "src/utils/contract";
import { useNetworkConst } from "src/utils/hooks";
import { logalert } from "src/utils/logalert";
import { imgStr } from "src/utils/string";

type Props = {
  order: NonNullable<ReturnType<typeof useGetOrder>["data"]>;
};

type NFTMetadata = {
  imgUrl: string | undefined;
  name: string | undefined;
};

type NFTMetadataList =
  | {
      sender: NFTMetadata;
      receiver: NFTMetadata;
    }
  | undefined;

export const useGetNftMetadata = ({ order }: Props) => {
  const [nftMetadata, setNftMetadata] = useState<NFTMetadataList>(undefined);
  const { alchemy } = useNetworkConst();
  useEffect(() => {
    alchemy.nft
      .getNftMetadataBatch([
        {
          contractAddress: order.receiverNFTContractAddress,
          tokenId: order.receiverNFTTokenId.toString(),
        },
        {
          contractAddress: order.senderNFTContractAddress,
          tokenId: order.senderNFTTokenId.toString(),
        },
      ])
      .then((res) => {
        const [receiver, sender] = res;
        setNftMetadata({
          receiver: {
            imgUrl: imgStr(receiver.rawMetadata?.image),
            name: receiver.rawMetadata?.name,
          },
          sender: {
            imgUrl: imgStr(sender.rawMetadata?.image),
            name: sender.rawMetadata?.name,
          },
        });
      })
      .catch((e: any) => {
        console.error(e);
        logalert(e.message);
      });
  }, [
    order.senderNFTContractAddress,
    order.senderNFTTokenId,
    order.receiverNFTContractAddress,
    order.receiverNFTTokenId,
    alchemy,
  ]);

  return { nftMetadata };
};
