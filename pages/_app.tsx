import type { AppProps } from "next/app";
import "../styles/global.css";
import Layout from "../components/Layout";
import { SWRConfig } from "swr";
import store from "../redux/store";
import { Provider } from "react-redux";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <SWRConfig
        value={{
          refreshInterval: 3000,
          fetcher: (url: string) => fetch(url).then((res) => res.json()),
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </Provider>
  );
}

export default MyApp;
