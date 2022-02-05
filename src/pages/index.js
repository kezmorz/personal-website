import { useTranslations } from "use-intl";
import { Typography } from "@mui/material";
import Layout from "@/components/Layout";

const Home = () => {
  const t = useTranslations("index");

  return (
    <div>
      <Typography variant="h1">{t("hello")}</Typography>
    </div>
  );
};

Home.getLayout = (page) => {
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

export default Home;
