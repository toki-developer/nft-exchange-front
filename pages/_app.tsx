import "tailwindcss/tailwind.css";

import type { AppPropsWithLayout } from "next/app";
import Head from "next/head";
import type { ReactElement } from "react";
import { WagmiConfigClient } from "src/libs/wagmi/WagmiConfigClient";

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

  return (
    <>
      <Head>
        <title>sample</title>
      </Head>
      <WagmiConfigClient>
        {getLayout(<Component {...pageProps} />)}
      </WagmiConfigClient>
    </>
  );
};

export default App;
