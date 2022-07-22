import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <div className="mx-auto max-w-lg bg-white min-h-screen">
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}

export default MyApp;
