import App from "next/app";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import "../styles/style.scss";
import { createContext } from "react";
import { getStrapiMedia } from "../lib/media";
import { fetchAPI } from "../lib/api";
import Layout from "../components/layout";
import { ThemeProvider } from "next-themes";

// Store Strapi Global object in context
export const GlobalContext = createContext({});

const MyApp = ({ Component, pageProps }) => {
  const { global } = pageProps;

  // console.log(global)
  return (
    <>
      <Head>
        {/* <link rel="shortcut icon" href={getStrapiMedia(global.favicon)} /> */}
      </Head>
      <GlobalContext.Provider value={global}>
        <AnimatePresence exitBeforeEnter>
        <ThemeProvider attribute="class">
          <Layout>
          <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
        </AnimatePresence>
      </GlobalContext.Provider>
    </>
  );
};

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx);
  // Fetch global site settings from Strapi
  const global = await fetchAPI("/global");
  // const response = await fetch('http://localhost:1337/global')
  // const global = response.json()
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global } };
};

export default MyApp;
