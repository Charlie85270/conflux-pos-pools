import { FC } from "react";
import { AppProps } from "next/app";
import "../global.css";
import { ThemeProvider } from "next-themes";

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider enableSystem={false} attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
};
export default App;
