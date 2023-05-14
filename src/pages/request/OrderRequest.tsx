import dynamic from "next/dynamic";
import { FormProvider, useForm } from "react-hook-form";
import { MainCard } from "src/components/MainCard";

import { NFTFormField } from "./NFTFormField";
import { StatusContextProvider } from "./StatusContext";
import type { NFTForm } from "./type";

const OrderRequestActionField = dynamic(
  () => import("./OrderRequestActionField"),
  { ssr: false }
);

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
          <OrderRequestActionField />
        </MainCard>
      </StatusContextProvider>
    </FormProvider>
  );
};
