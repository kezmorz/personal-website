import { useTranslations } from "use-intl";
import { Container } from "@mui/material";
import { loader as cloudinaryImageLoader } from "@/lib/cloudinary";
import { pick } from "@/utils/misc";
import Header from "@/components/Header";
import Layout from "@/components/Layout";

// about me
// technical skills
// about this website (how it was built)

const About = () => {
  const t = useTranslations("about");

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
      <Container
        component="section"
        maxWidth="md"
        sx={{ mb: { xs: 8, sm: 16 } }}
      ></Container>
    </>
  );
};

About.getLayout = (page) => {
  return (
    <Layout>
      <main>{page}</main>
    </Layout>
  );
};

About.messages = ["about", ...Layout.messages];

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      messages: pick(
        await import(`../translations/${locale}.json`),
        About.messages
      ),
    },
  };
};

export default About;
