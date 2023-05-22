import "tailwindcss/tailwind.css";

import { Analytics } from "@vercel/analytics/react";
import type { AppPropsWithLayout } from "next/app";
import Head from "next/head";
import type { ReactElement } from "react";
import { CustomToast } from "src/components/Toast";
import { WagmiConfigClient } from "src/libs/wagmi/WagmiConfigClient";

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

  return (
    <>
      <Head>
        <title>NFT交換ツール</title>
      </Head>
      <WagmiConfigClient>
        <>
          {getLayout(<Component {...pageProps} />)}
          <CustomToast />
        </>
      </WagmiConfigClient>
      <Analytics />
    </>
  );
};

export default App;
