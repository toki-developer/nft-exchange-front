import type { NextPageWithLayout } from "next";
import { Layout } from "src/layouts";
import { OrderRequest } from "src/pages/request";

const IndexPage: NextPageWithLayout = () => {
  return <OrderRequest />;
};

IndexPage.getLayout = Layout;

export default IndexPage;
