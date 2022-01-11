// show my resume here - maybe do this using markdown
// have some links to be able to download the cv
// no personal details on here except e-mail

import fs from "fs";
import path from "path";
import { useTranslations } from "use-intl";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Layout from "@/components/Layout";

const components = {
  h1: (props) => <Typography variant="h1" {...props} />,
  h2: (props) => <Typography variant="h2" {...props} />,
  h3: (props) => <Typography variant="h3" {...props} />,
  h4: (props) => <Typography variant="h4" {...props} />,
  h5: (props) => <Typography variant="h5" {...props} />,
  h6: (props) => <Typography variant="h6" {...props} />,
  p: (props) => <Typography variant="body1" {...props} />,
};

const Resume = ({ source, frontMatter }) => {
  const t = useTranslations("resume");

  return (
    <div>
      {/* <Typography variant="h1">{t("heading")}</Typography> */}
      <Container maxWidth="md">
        <MDXRemote components={components} {...source} />
        <Typography variant="caption">
          Updated at: {frontMatter.updatedAt}
        </Typography>
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
