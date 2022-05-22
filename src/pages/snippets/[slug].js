import { useTranslations } from "use-intl";
import { allSnippets } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import { Container, Button, Typography, Box } from "@mui/material";
import { ArrowBackOutlined as ArrowBackOutlinedIcon } from "@mui/icons-material";
import { pick } from "@/utils/misc";
import { Heading4, Paragraph, Anchor, Pre } from "@/components/Markdown";
import Link from "@/components/Link";
import Layout from "@/components/Layout";

const components = {
  h4: (props) => <Heading4 {...props} />,
  p: (props) => <Paragraph {...props} />,
  a: (props) => <Anchor {...props} />,
  pre: (props) => <Pre {...props} />,
};

const Snippet = ({ snippet }) => {
  const t = useTranslations("snippet");
  const MdxComponent = useMDXComponent(snippet.body.code);

  console.log(snippet);

  return (
    <>
      <Container
        component="section"
        maxWidth="md"
        sx={{ mt: { xs: 8, sm: 16 } }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            component={Link}
            href="/snippets"
            variant="contained"
            size="large"
            startIcon={<ArrowBackOutlinedIcon />}
          >
            {t("information.button")}
          </Button>
          <Typography variant="body1">{`1000 ${t(
            "information.views"
          )}`}</Typography>
        </Box>
      </Container>
      <Container
        component="article"
        maxWidth="md"
        sx={{ mt: { xs: 8, sm: 16 } }}
      >
        <Typography variant="h3">{snippet.title}</Typography>
        <Box sx={{ mt: { xs: 4, sm: 8 } }}>
          <MdxComponent components={components} />
        </Box>
      </Container>
      <Container
        component="section"
        maxWidth="md"
        sx={{ mt: { xs: 8, sm: 16 }, mb: { xs: 8, sm: 16 } }}
      >
        <Typography variant="h4">{t("related")}</Typography>
      </Container>
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
  const snippet = allSnippets.find(
    (snippet) => snippet.slug === params.slug && snippet.locale === locale
  );

  // go through other snippets and work out the number of matching tags with the chosen snippet
  // pick two that have the highest number of matching tags
  // if there are more than two with highest number of matching tags, pick them at random
  // add a related snippets prop below

  return {
    props: {
      snippet: snippet,
      messages: pick(
        await import(`../../translations/${locale}.json`),
        Snippet.messages
      ),
    },
  };
};

export default Snippet;
