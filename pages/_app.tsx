import "../styles/_app.scss";
import type { AppProps } from "next/app";
import Layout from "../layout/Layout";
import CategoriesContextProvider from "../context/categoriesContext";
import AuthContextProvider from "../context/authContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <CategoriesContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CategoriesContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
