import { useMemo } from "react";
import PropTypes from "prop-types";
import { NextIntlProvider } from "next-intl";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import { createEmotionCache } from "@/lib/emotion";
import brandingTheme from "@/modules/brandingTheme";
import useThemeMode from "@/hooks/useThemeMode";
import Analytics from "@/components/Analytics";

const clientSideEmotionCache = createEmotionCache();

const MyApp = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps: { messages, now, ...pageProps },
}) => {
  const { isDarkMode } = useThemeMode();

  const theme = useMemo(
    () => brandingTheme(isDarkMode ? "dark" : "light"),
    [isDarkMode]
  );

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Analytics />
      <NextIntlProvider
        // formats={{           // CERI - look at this
        //   dateTime: {
        //     short: {
        //       day: "numeric",
        //       month: "short",
        //       year: "numeric",
        //     },
        //   },
        // }}
        messages={messages}
        // now={new Date(now)}
        // timeZone="Europe/Dublin"
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </NextIntlProvider>
    </CacheProvider>
  );
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
