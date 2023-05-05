import { FormProvider, useForm } from "react-hook-form";

import { ApproveButton } from "./ApproveButton";
import { OrderButton } from "./OrderButton";
import { StatusContextProvider } from "./StatusContext";
import type { NFTForm } from "./type";

const Required = { required: { value: true, message: "入力が未完了です" } };
const AddressFormat = {
  pattern: {
    value: /^0x[0-9a-fA-F]{40}$/,
    message: "アドレス入力に不備があります",
  },
};

/**
 * @package
 */
export const OrderRequest = () => {
  const form = useForm<NFTForm>({ mode: "onChange" });
  const {
    formState: { errors },
    register,
  } = form;

  return (
    <FormProvider {...form}>
      <StatusContextProvider>
        <label>
          <input
            {...register("senderNFTContractAddress", {
              ...Required,
              ...AddressFormat,
            })}
          />
          <p>{errors.senderNFTContractAddress?.message}</p>
        </label>
        <label>
          <input {...register("senderNFTTokenId", { ...Required })} />
          <p>{errors.senderNFTTokenId?.message}</p>
        </label>
        <br />
        <label>
          <input
            {...register("receiverNFTContractAddress", {
              ...Required,
              ...AddressFormat,
            })}
          />
          <p>{errors.receiverNFTContractAddress?.message}</p>
        </label>
        <label>
          <input {...register("receiverNFTTokenId", { ...Required })} />
          <p>{errors.receiverNFTTokenId?.message}</p>
        </label>
        <ApproveButton />
        <OrderButton />
      </StatusContextProvider>
    </FormProvider>
  );
};

//TODO: 現在登録済みのオーダーを表示する
//TODO: 現在登録済みのオーダーを初期値にする
//TODO: approveチェックをする
//TODO: approveが完了した段階で、オーダー登録ボタンを押せるようにする
//TODO: TODO項目を修正する
//TODO: コントラクトが存在しない時の挙動など、細かな調整 (?を使ってるとこ)
//TODO: バリデーションを付ける
