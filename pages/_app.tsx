import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ShapeContextProvider } from "../context/ShapesContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ShapeContextProvider>
      <Component {...pageProps} />
    </ShapeContextProvider>
  );
}

export default MyApp;
