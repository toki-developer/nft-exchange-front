import type { NextPageWithLayout } from "next";
import { Layout } from "src/layouts";
import { OrderRequest } from "src/pages/request";
import type { Address } from "wagmi";

export type OptionalQuery = {
  sender: Address;
};

const IndexPage: NextPageWithLayout = () => {
  return <OrderRequest />;
};

IndexPage.getLayout = Layout;

export default IndexPage;
