import { useTranslations } from "use-intl";
import { allSnippets } from "contentlayer/generated";
import { Container } from "@mui/material";
import { pick } from "@/utils/misc";
import Layout from "@/components/Layout";

const Snippet = ({ snippet }) => {
  const t = useTranslations("snippet");

  console.log(snippet);

  return (
    <>
      <Container
        component="section"
        maxWidth="md"
        sx={{ mb: { xs: 8, sm: 16 } }}
      ></Container>
    </>
  );
};

Snippet.getLayout = (page) => {
  return (
    <Layout>
      <main>{page}</main>
    </Layout>
  );
};

Snippet.messages = ["snippet", ...Layout.messages];

export const getStaticPaths = async () => {
  return {
    paths: allSnippets.map(({ slug, locale }) => ({
      params: { slug: slug },
      locale: locale,
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params, locale }) => {
  return {
    props: {
      snippet: allSnippets.find(
        (snippet) => snippet.slug === params.slug && snippet.locale === locale
      ),
      messages: pick(
        await import(`../../translations/${locale}.json`),
        Snippet.messages
      ),
    },
  };
};

export default Snippet;
