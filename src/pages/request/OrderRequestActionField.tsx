import { Web3Button } from "@web3modal/react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useModal } from "src/components/Modal";
import { useGetOrder } from "src/utils/contract";
import { useAlchemy } from "src/utils/hooks/useAlchemy";
import { imgStr } from "src/utils/string";
import type { Address } from "wagmi";
import { useAccount } from "wagmi";

import { ApproveButton } from "./ApproveButton";
import { ModalContent } from "./ModalContent";
import { OrderButton } from "./OrderButton";

const OrderRequestActionField = () => {
  const { address } = useAccount();

  if (!address) {
    return (
      <div className="text-center mt-8">
        <Web3Button />
      </div>
    );
  }

  return <OrderRequestActionFieldImpl address={address} />;
};

// eslint-disable-next-line import/no-default-export
export default OrderRequestActionField;

type NFTMetadata = {
  imgUrl: string | undefined;
  name: string | undefined;
};

export type NFTMetadataList = {
  sender: NFTMetadata | undefined;
  receiver: NFTMetadata | undefined;
};

const defaultVal = {
  sender: undefined,
  receiver: undefined,
};

const OrderRequestActionFieldImpl = ({ address }: { address: Address }) => {
  const { data: orderData, refetch } = useGetOrder(address);
  const [nftMetadata, setNFTMetadata] = useState<NFTMetadataList>(defaultVal);
  const { Modal, handleOpen } = useModal();
  const alchemy = useAlchemy();

  const [modalTitle, setModalTitle] = useState<string>("作成済みオファー");

  const handlShowOffer = () => {
    setModalTitle("作成済みオファー");
    handleOpen();
  };

  const handleOffreCreated = () => {
    refetch()
      .then((res) => {
        if (
          res.status == "success" ||
          res.data?.receiverNFTContractAddress !== ethers.constants.AddressZero
        ) {
          setModalTitle("オファーの作成に成功しました");
          handleOpen();
        }
      })
      .catch((e) => {
        //TODO: エラーのときの処理(再フェッチ)
        console.error(e);
      });
  };

  useEffect(() => {
    if (!orderData) {
      return;
    }
    alchemy.nft
      .getNftMetadataBatch([
        {
          contractAddress: orderData.senderNFTContractAddress,
          tokenId: orderData.senderNFTTokenId.toString(),
        },
        {
          contractAddress: orderData.receiverNFTContractAddress,
          tokenId: orderData.receiverNFTTokenId.toString(),
        },
      ])
      .then((res) => {
        const [sender, receiver] = res;
        setNFTMetadata({
          sender: {
            imgUrl: imgStr(sender.rawMetadata?.image),
            name: sender.rawMetadata?.name,
          },
          receiver: {
            imgUrl: imgStr(receiver.rawMetadata?.image),
            name: receiver.rawMetadata?.name,
          },
        });
      })
      .catch((e) => {
        //TODO: エラー
        console.error(e);
      });
  }, [orderData, alchemy]);

  return (
    <div className="flex justify-center gap-6 mt-8 ">
      <ApproveButton />
      <OrderButton onOfferCreated={handleOffreCreated} />
      {orderData ? (
        <div className="absolute right-6 bottom-6 text-sm">
          <button
            className="underline text-textcolor-sub"
            onClick={handlShowOffer}
          >
            作成済みオファー
          </button>
        </div>
      ) : null}
      {orderData ? (
        <Modal>
          <ModalContent
            order={orderData}
            title={modalTitle}
            nftMetadata={nftMetadata}
          />
        </Modal>
      ) : null}
    </div>
  );
};
