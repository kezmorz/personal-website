import { useRouter } from "next/router";
import fs from "fs";
import path from "path";
import { useTranslations } from "use-intl";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { Container, Grid, Divider, Typography, Box } from "@mui/material";
import { formatDate } from "@/utils/date";
import Layout from "@/components/Layout";
import MediaCard from "@/components/MediaCard";

const components = {
  h4: (props) => <Typography variant="h4" {...props} />,
  h6: (props) => <Typography variant="h6" {...props} />,
  p: (props) => <Typography variant="body1" {...props} />,
  hr: (props) => <Divider sx={{ mt: 1, mb: 2 }} {...props} />,
};

const Resume = ({ source, frontMatter }) => {
  const { locale } = useRouter();
  const t = useTranslations("resume");

  return (
    <div>
      <Container component="section" maxWidth="md">
        <Typography variant="h3" gutterBottom>
          {t("description.heading")}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {t("description.paragraph")}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {t("description.update")}: {formatDate(frontMatter.updatedAt, locale)}
        </Typography>
      </Container>
      {/* Using box here so we can change the background colour */}
      <Box
        component="section"
        sx={{ mt: { xs: 3, sm: 6 }, py: { xs: 2, sm: 3 } }}
      >
        <Container maxWidth="md">
          <MDXRemote components={components} {...source} />
        </Container>
      </Box>
      <Container
        component="section"
        maxWidth="md"
        sx={{ mt: { xs: 3, sm: 6 } }}
      >
        <Typography variant="h3" gutterBottom>
          {t("formats.heading")}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {t("formats.paragraph")}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <MediaCard
              title="This is a title"
              // description="This is something"
              href="https://tfn-freight.virtual-engage.com/content/Welcome.pdf"
              alt="microsoft word"
              sx={{ height: "100%" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <MediaCard
              title="This is a title"
              description="This is something and I want to make the longest sentence possible so we can see how the height will behave"
              href="https://tfn-freight.virtual-engage.com/content/Welcome.pdf"
              alt="microsoft word"
              sx={{ height: "100%" }}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

Resume.getLayout = (page) => {
  return (
    <Layout>
      <main>{page}</main>
    </Layout>
  );
};

export async function getStaticProps({ locale }) {
  const filepath = path.join(process.cwd(), `src/content/${locale}/resume.mdx`);
  const source = fs.readFileSync(filepath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, { scope: data });

  return {
    props: {
      messages: (await import(`../translations/${locale}.json`)).default,
      source: mdxSource,
      frontMatter: data,
    },
  };
}

export default Resume;
