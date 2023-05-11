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
