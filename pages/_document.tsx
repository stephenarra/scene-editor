import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html className="h-full" data-theme="light">
      <Head />
      <body className="h-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
