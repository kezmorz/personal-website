import { useTranslations } from "use-intl";
import { Typography } from "@mui/material";
import { pick } from "@/utils/misc";
import Meta from "@/components/Meta";
import Layout from "@/components/Layout";

const Home = () => {
  const t = useTranslations("home");

  return (
    <>
      <Meta
        title={t("metadata.title")}
        description={t("metadata.description")}
        type="website"
        image=""
      />
    </>
  );
};

Home.getLayout = (page) => {
  return (
    <Layout>
      <main>{page}</main>
    </Layout>
  );
};

Home.messages = ["home", ...Layout.messages];

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
