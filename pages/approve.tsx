import type { NextPageWithLayout } from "next";
import { Layout } from "src/layouts";
import { OrderApprove } from "src/pages/approve";

const ApprovePage: NextPageWithLayout = () => {
  return <OrderApprove />;
};

ApprovePage.getLayout = Layout;

export default ApprovePage;
