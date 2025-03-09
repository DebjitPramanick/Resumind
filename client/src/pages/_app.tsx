import "@fontsource/manrope/300.css"; // Light
import "@fontsource/manrope/400.css"; // Regular
import "@fontsource/manrope/500.css"; // Medium
import "@fontsource/manrope/600.css"; // Semi-bold
import "@fontsource/manrope/700.css"; // Bold
import type { AppProps } from "next/app";
import { AppProvider } from "@/contexts";
import { MainLayout } from "@/components/layouts";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>ResuMind</title>
        <meta name="description" content="ResuMind" />
      </Head>
      <AppProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </AppProvider>
    </>
  );
}
