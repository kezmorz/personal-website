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
