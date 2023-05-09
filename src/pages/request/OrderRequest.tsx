import { FormProvider, useForm } from "react-hook-form";
import { MainCard } from "src/components/MainCard";

import { ApproveButton } from "./ApproveButton";
import { NFTFormField } from "./NFTFormField";
import { OrderButton } from "./OrderButton";
import { StatusContextProvider } from "./StatusContext";
import type { NFTForm } from "./type";

/**
 * @package
 */
export const OrderRequest = () => {
  const form = useForm<NFTForm>({ mode: "onChange" });

  return (
    <FormProvider {...form}>
      <StatusContextProvider>
        <MainCard>
          <NFTFormField />
          <div className="flex justify-center gap-6 mt-8 ">
            <ApproveButton />
            <OrderButton />
          </div>
        </MainCard>
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
