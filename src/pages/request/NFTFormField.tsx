import { type InputHTMLAttributes, forwardRef } from "react";
import type { FieldError, Merge } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import { ArrowPath } from "src/components/Icon";

import type { NFTForm } from "./type";
import { useGetNftMetadata } from "./useGetNftMetadata";

const Required = { required: { value: true, message: "入力必須です" } };
const AddressFormat = {
  pattern: {
    value: /^0x[0-9a-fA-F]{40}$/,
    message: "アドレス入力に不備があります",
  },
};
/**
 * @package
 */
export const NFTFormField = () => {
  const {
    formState: { errors },
    register,
  } = useFormContext<NFTForm>();

  const { receiverNFT, senderNFT } = useGetNftMetadata();

  return (
    <div>
      <fieldset>
        <legend>送るNFT</legend>
        <AddressInput
          errorMessage={errors.senderNFTContractAddress}
          {...register("senderNFTContractAddress", {
            ...Required,
            ...AddressFormat,
          })}
        />
        <div className="flex items-center">
          <TokenIdInput
            errorMessage={errors.senderNFTTokenId}
            {...register("senderNFTTokenId", { ...Required })}
          />
          {errors.senderNFTTokenId || errors.senderNFTTokenId ? null : (
            <NFTInfo nft={senderNFT} />
          )}
        </div>
      </fieldset>
      <div className="my-4 flex justify-center">
        <ArrowPath className="text-primary w-10 h-10 rotate-90" />
      </div>
      <fieldset>
        <legend>受け取るNFT</legend>
        <AddressInput
          errorMessage={errors.receiverNFTContractAddress}
          {...register("receiverNFTContractAddress", {
            ...Required,
            ...AddressFormat,
          })}
        />
        <div className="flex items-center">
          <TokenIdInput
            errorMessage={errors.receiverNFTTokenId}
            {...register("receiverNFTTokenId", { ...Required })}
          />
          {errors.receiverNFTContractAddress ||
          errors.receiverNFTTokenId ? null : (
            <NFTInfo nft={receiverNFT} />
          )}
        </div>
      </fieldset>
    </div>
  );
};

type AddressInputProps = InputHTMLAttributes<HTMLInputElement> & {
  errorMessage: FieldError | undefined;
};

const AddressInput = forwardRef<HTMLInputElement, AddressInputProps>(
  ({ errorMessage, ...props }, ref) => {
    return (
      <label>
        <p className="text-xs text-textcolor-sub mt-3 pl-1 mb-1">
          コントラクトアドレス
        </p>
        <input
          className={`bg-bgcolor  border rounded-md text-lg  pl-2 w-full ${
            errorMessage ? "border-red-500" : "border-gray-700"
          }`}
          placeholder="0x0000000000000000000000000000000000000000"
          {...props}
          ref={ref}
        />
        <div className="h-2 mt-1">
          {errorMessage ? (
            <p className="text-red-500 text-xs pl-2">{errorMessage.message}</p>
          ) : null}
        </div>
      </label>
    );
  }
);

AddressInput.displayName = "AddressInput";

type TokenIdInputProps = InputHTMLAttributes<HTMLInputElement> & {
  errorMessage: Merge<FieldError, any> | undefined;
};

const TokenIdInput = forwardRef<HTMLInputElement, TokenIdInputProps>(
  ({ errorMessage, ...props }, ref) => {
    return (
      <label>
        <p className="text-xs text-textcolor-sub mt-2 pl-1 mb-1">トークンID</p>
        <input
          className={`bg-bgcolor  border rounded-md text-lg pl-2 text-right ${
            errorMessage ? "border-red-500" : "border-gray-700"
          }`}
          placeholder="1"
          {...props}
          ref={ref}
          type="number"
        />
        <div className="h-2 mt-1">
          {errorMessage ? (
            <p className="text-red-500 text-xs pl-2">{errorMessage.message}</p>
          ) : null}
        </div>
      </label>
    );
  }
);

TokenIdInput.displayName = "TokenIdInput";

const NFTInfo = ({
  nft,
}: {
  nft: ReturnType<typeof useGetNftMetadata>["senderNFT"];
}) => {
  if (!nft) {
    return null;
  }

  return (
    <div className="flex gap-4 items-center flex-1">
      {nft.imgUrl ? (
        <div className=" flex-1 flex justify-end">
          <img
            src={nft.imgUrl}
            alt="sender nft image"
            className="w-[60px] h-[60px] object-contain"
          />
        </div>
      ) : (
        <div className="flex-1" />
      )}
      {nft.name ? (
        <p className="flex-1 text-ellipsis overflow-hidden whitespace-nowrap">
          {nft.name}
        </p>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
};
