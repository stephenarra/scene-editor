import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ClientProvider } from "../utils/useShare";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClientProvider>
      <Component {...pageProps} />
    </ClientProvider>
  );
}

export default MyApp;
