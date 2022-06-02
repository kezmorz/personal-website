import PropTypes from "prop-types";
import { useRouter } from "next/router";
import Head from "next/head";

const openGraphLocale = {
  en: "en_US",
  cy: "cy_GB",
};

const openGraphLocaleAlternate = {
  en: ["en_GB", "cy_GB"],
  cy: ["en_US", "en_GB"],
};

const Meta = ({
  title = "Ceri Morse",
  description = "",
  type = "website",
  image = "",
}) => {
  const { pathname, locale, locales, defaultLocale } = useRouter();

  const url = `https://cerimorse.com${
    locale === defaultLocale ? "" : `/${locale}`
  }${pathname}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {locales.map((alternateLocale) => (
        <link
          key={alternateLocale}
          rel="alternate"
          href={`https://cerimorse.com${
            alternateLocale === defaultLocale ? "" : `/${alternateLocale}`
          }${pathname}`}
          hrefLang={alternateLocale}
        />
      ))}
      <link
        rel="alternate"
        href={`https://cerimorse.com${pathname}`}
        hrefLang="x-default"
      />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Ceri Morse" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
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
