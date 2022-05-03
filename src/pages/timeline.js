import { useTranslations } from "use-intl";
import { loader as cloudinaryImageLoader } from "@/lib/cloudinary";
import { pick } from "@/utils/misc";
import Header from "@/components/Header";
import Layout from "@/components/Layout";

const Timeline = () => {
  const t = useTranslations("timeline");

  return (
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
  );
};

Timeline.getLayout = (page) => {
  return (
    <Layout>
      <main>{page}</main>
    </Layout>
  );
};

Timeline.messages = ["timeline", ...Layout.messages];

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      messages: pick(
        await import(`../translations/${locale}.json`),
        Timeline.messages
      ),
    },
  };
};

export default Timeline;
