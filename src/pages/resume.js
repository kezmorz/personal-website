import { useRouter } from "next/router";
import fs from "fs";
import path from "path";
import { useTranslations } from "use-intl";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { Container, Divider, Typography, Box } from "@mui/material";
import { formatDate } from "@/utils/date";
import Layout from "@/components/Layout";

const components = {
  h3: (props) => <Typography variant="h3" {...props} />,
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
        <MDXRemote components={components} {...source} />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Typography variant="body2">
            Updated at: {formatDate(frontMatter.updatedAt, locale)}
          </Typography>
        </Box>
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
