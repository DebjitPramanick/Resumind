import "@/styles/globals.css";
import "@fontsource/manrope/300.css"; // Light
import "@fontsource/manrope/400.css"; // Regular
import "@fontsource/manrope/500.css"; // Medium
import "@fontsource/manrope/600.css"; // Semi-bold
import "@fontsource/manrope/700.css"; // Bold
import type { AppProps } from "next/app";
import { AppProvider } from "@/contexts";
import { MainLayout } from "@/components/layouts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </AppProvider>
  );
}
