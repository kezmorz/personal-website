import { useRouter } from "next/router";
import fs from "fs";
import path from "path";
import { useTranslations } from "use-intl";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import {
  Container,
  Grid,
  Divider,
  Alert,
  Typography,
  Box,
} from "@mui/material";
import { loader as cloudinaryImageLoader } from "@/lib/cloudinary";
import { formatDate } from "@/utils/date";
import { pick } from "@/utils/misc";
import Header from "@/components/Header";
import SpotlightContainer from "@/components/SpotlightContainer";
import MediaCard from "@/components/MediaCard";
import Layout from "@/components/Layout";

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
    <>
      <Header
        heading={t("heading")}
        subheading={t("subheading")}
        imageProps={{
          src: "samples/cloudinary-icon.png",
          alt: "Something something something",
          width: 480,
          height: 350,
          layout: "responsive",
          loader: cloudinaryImageLoader,
        }}
        direction="ltr"
      />
      <Container component="section" maxWidth="md">
        <Typography variant="h3" gutterBottom>
          {t("description.heading")}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {t("description.paragraph.line1")}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {t("description.paragraph.line2")}
        </Typography>
        <Typography variant="caption" gutterBottom>
          {t("description.update")}: {formatDate(frontMatter.updatedAt, locale)}
        </Typography>
        <Alert severity="info" sx={{ mt: { xs: 2, sm: 4 } }}>
          {t("description.info")}
        </Alert>
      </Container>
      <SpotlightContainer
        component="section"
        maxWidth="md"
        sx={{ mt: { xs: 3, sm: 6 } }}
      >
        <MDXRemote components={components} {...source} />
      </SpotlightContainer>
      <Container
        component="section"
        maxWidth="md"
        sx={{ mt: { xs: 3, sm: 6 }, mb: { xs: 8, md: 16 } }}
      >
        <Typography variant="h3" gutterBottom>
          {t("formats.heading")}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {t("formats.paragraph")}
        </Typography>
        <Grid container spacing={2} sx={{ mt: { xs: 1, sm: 2 } }}>
          <Grid item xs={12} md={6}>
            <MediaCard
              title={t("formats.word.title")}
              description={t("formats.word.description")}
              href="#"
              image="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Microsoft_Office_Word_%282019%E2%80%93present%29.svg/258px-Microsoft_Office_Word_%282019%E2%80%93present%29.svg.png"
              alt="microsoft word"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <MediaCard
              title={t("formats.pdf.title")}
              description={t("formats.pdf.description")}
              href="#"
              image="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/195px-PDF_file_icon.svg.png"
              alt="pdf"
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

Resume.getLayout = (page) => {
  return (
    <Layout>
      <main>{page}</main>
    </Layout>
  );
};

Resume.messages = ["resume", ...Layout.messages];

export const getStaticProps = async ({ locale }) => {
  const filepath = path.join(process.cwd(), `src/content/${locale}/resume.mdx`);
  const source = fs.readFileSync(filepath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, { scope: data });

  return {
    props: {
      messages: pick(
        await import(`../translations/${locale}.json`),
        Resume.messages
      ),
      source: mdxSource,
      frontMatter: data,
    },
  };
};

export default Resume;
