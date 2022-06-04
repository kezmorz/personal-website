import { useRouter } from "next/router";
import useSwr from "swr";
import { useTranslations } from "use-intl";
import { allSnippets } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import {
  Container,
  Button,
  LinearProgress,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import { ArrowBackOutlined as ArrowBackOutlinedIcon } from "@mui/icons-material";
import fetcher from "@/services/fetcher";
import { urlBuilder, pick } from "@/utils/misc";
import {
  Heading4 as MdxHeading4,
  Paragraph as MdxParagraph,
  OrderedList as MdxOrderedList,
  UnorderedList as MdxUnorderedList,
  ListItem as MdxListItem,
  Anchor as MdxAnchor,
  Pre as MdxPre,
} from "@/components/Markdown";
import Meta from "@/components/Meta";
import { SnippetCard } from "@/components/Card";
import Link from "@/components/Link";
import Layout from "@/components/Layout";

const components = {
  h4: (props) => <MdxHeading4 {...props} />,
  p: (props) => <MdxParagraph {...props} />,
  ol: (props) => <MdxOrderedList {...props} />,
  ul: (props) => <MdxUnorderedList {...props} />,
  li: (props) => <MdxListItem {...props} />,
  a: (props) => <MdxAnchor {...props} />,
  pre: (props) => <MdxPre {...props} />,
};

const Snippet = ({ snippet, relatedSnippets }) => {
  const { defaultLocale } = useRouter();
  const { data: analyticsData } = useSwr(
    `/api/analytics/page-views?slug=/snippets/${snippet.slug}`,
    fetcher
  );
  const t = useTranslations("snippet");
  const MdxComponent = useMDXComponent(snippet.body.code);

  const tweetUrl = `https://twitter.com/intent/tweet?${new URLSearchParams({
    url: urlBuilder(
      "cerimorse.com",
      snippet.locale,
      defaultLocale,
      `/snippets/${snippet.slug}`
    ),
    text: t("social.tweet.text", { title: snippet.title }),
  })}`;

  const editUrl = `https://github.com/kezmorz/personal-website/edit/main/src/content/snippets/${
    snippet.slug
  }.${snippet.locale === defaultLocale ? "mdx" : `${snippet.locale}.mdx`}`;

  return (
    <>
      <Meta
        title={t("metadata.title", { title: snippet.title })}
        description={snippet.description}
        type="article"
        image=""
      />
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
          {analyticsData ? (
            <Typography variant="body1">{`${analyticsData.views} ${t(
              "information.views"
            )}`}</Typography>
          ) : (
            <Box sx={{ width: 80 }}>
              <LinearProgress />
            </Box>
          )}
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
        <Box sx={{ mt: { xs: 4, sm: 8 } }}>
          <Divider />
          <Box sx={{ display: "flex", mt: { xs: 1, sm: 2 } }}>
            <Link
              href={tweetUrl}
              target="_blank"
              rel="noopener"
              underline="hover"
            >
              {t("social.tweet.link")}
            </Link>
            <Typography component="span" variant="body1" sx={{ mx: 1 }}>
              •
            </Typography>
            <Link
              href={editUrl}
              target="_blank"
              rel="noopener"
              underline="hover"
            >
              {t("social.edit")}
            </Link>
          </Box>
        </Box>
      </Container>
      <Container
        component="section"
        maxWidth="md"
        sx={{ mt: { xs: 8, sm: 16 }, mb: { xs: 8, sm: 16 } }}
      >
        <Typography variant="h4">{t("related")}</Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: { xs: 2, md: 4 },
            mt: { xs: 4, md: 8 },
          }}
        >
          {relatedSnippets.map(({ title, description, publishedAt, slug }) => (
            <SnippetCard
              key={slug}
              heading={title}
              description={description}
              date={publishedAt}
              href={`/snippets/${slug}`}
              sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}
            />
          ))}
        </Box>
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
    ({ slug, locale: snippetLocale }) =>
      slug === params.slug && snippetLocale === locale
  );

  const relatedSnippets = allSnippets
    .filter(
      ({ slug, locale: snippetLocale }) =>
        slug !== params.slug && snippetLocale === locale
    )
    .map(({ title, description, tags, publishedAt, slug }) => ({
      title,
      description,
      publishedAt,
      slug,
      similarity: snippet.tags.reduce((a, b) => a + tags.includes(b), 0),
    }))
    .reduce(
      (a, b) =>
        b.similarity > a[0].similarity
          ? [b, a[1]]
          : b.similarity > a[1].similarity
          ? [a[0], b]
          : b.similarity === a[0].similarity && b.similarity === a[1].similarity
          ? Math.random() < 0.5
            ? Math.random() < 0.5
              ? [b, a[1]]
              : [a[0], b]
            : a
          : b.similarity === a[0].similarity
          ? Math.random() < 0.5
            ? [b, a[1]]
            : a
          : b.similarity === a[1].similarity
          ? Math.random() < 0.5
            ? [a[0], b]
            : a
          : a,
      [{ similarity: -1 }, { similarity: -1 }]
    );

  return {
    props: {
      snippet: snippet,
      relatedSnippets: relatedSnippets,
      messages: pick(
        await import(`../../translations/${locale}.json`),
        Snippet.messages
      ),
    },
    revalidate: 60,
  };
};

export default Snippet;
