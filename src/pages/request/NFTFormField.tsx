import { type InputHTMLAttributes, forwardRef } from "react";
import type { FieldError, Merge } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import { ArrowPath } from "src/components/Icon";

import type { NFTForm } from "./type";

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
        <TokenIdInput
          errorMessage={errors.senderNFTTokenId}
          {...register("senderNFTTokenId", { ...Required })}
        />
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
        <TokenIdInput
          errorMessage={errors.receiverNFTTokenId}
          {...register("receiverNFTTokenId", { ...Required })}
        />
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
          className={`bg-bgcolor  border rounded-md text-lg pl-2 w-1/4 text-right ${
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
