import "../styles/_app.scss";
import type { AppProps } from "next/app";
import Layout from "../layout/Layout";
import CategoriesContextProvider from "../context/categoriesContext";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <CategoriesContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CategoriesContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
