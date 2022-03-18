import { useTranslations } from "use-intl";
import { Typography } from "@mui/material";
import { pick } from "@/utils/misc";
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

Home.messages = ["index", ...Layout.messages];

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      messages: pick(
        await import(`../translations/${locale}.json`),
        Home.messages
      ),
    },
  };
};

export default Home;
