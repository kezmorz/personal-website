// show my resume here - maybe do this using markdown
// have some links to be able to download the cv
// no personal details on here except e-mail

import { useTranslations } from "use-intl";
import Typography from "@mui/material/Typography";
import Layout from "@/components/Layout";

const Resume = () => {
  const t = useTranslations("resume");

  return (
    <div>
      <Typography variant="h1">{t("heading")}</Typography>
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
  return {
    props: {
      messages: (await import(`../translations/${locale}.json`)).default,
    },
  };
}

export default Resume;
