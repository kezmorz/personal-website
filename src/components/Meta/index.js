import PropTypes from "prop-types";
import { useRouter } from "next/router";
import Head from "next/head";
import { urlBuilder } from "@/utils/misc";

const openGraphLocale = {
  en: "en_US",
  cy: "cy_GB",
};

const openGraphLocaleAlternate = {
  en: ["en_GB", "cy_GB"],
  cy: ["en_US", "en_GB"],
};

const Meta = ({ title, description, type, image }) => {
  const { asPath, locale, locales, defaultLocale } = useRouter();

  const [pathname] = asPath.split("?");

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link
        rel="canonical"
        href={urlBuilder("cerimorse.com", locale, defaultLocale, pathname)}
      />
      {locales.map((alternateLocale) => (
        <link
          key={alternateLocale}
          rel="alternate"
          href={urlBuilder(
            "cerimorse.com",
            alternateLocale,
            defaultLocale,
            pathname
          )}
          hrefLang={alternateLocale}
        />
      ))}
      <link
        rel="alternate"
        href={urlBuilder(
          "cerimorse.com",
          defaultLocale,
          defaultLocale,
          pathname
        )}
        hrefLang="x-default"
      />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Ceri Morse" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:url"
        content={urlBuilder("cerimorse.com", locale, defaultLocale, pathname)}
      />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={openGraphLocale[locale]} />
      {openGraphLocaleAlternate[locale].map((ogLocaleAlternate) => (
        <meta
          key={ogLocaleAlternate}
          property="og:locale:alternate"
          content={ogLocaleAlternate}
        />
      ))}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@kezmorz" />
      <meta name="twitter:creator" content="@kezmorz" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
};

Meta.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.string,
  image: PropTypes.string,
};

export default Meta;
