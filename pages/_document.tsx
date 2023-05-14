import { Head, Html, Main, NextScript } from "next/document";

export default function document() {
  return (
    <Html lang="ja">
      <Head />
      <body className="bg-bgcolor text-textcolor-main min-h-screen">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
