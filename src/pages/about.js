import Image from "next/image";
import { useTranslations } from "use-intl";
import { Box, Container, Typography } from "@mui/material";
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
      <Container component="section" maxWidth="md">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: { xs: 2, md: 4 },
          }}
        >
          <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
            <Image
              src="pages/about/bitesize.jpg"
              alt="Something something something"
              width={827}
              height={1410}
              layout="responsive"
              loader={cloudinaryImageLoader}
            />
          </Box>
          <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
            <Typography variant="h4" sx={{ mt: { xs: 2, sm: 4 }, mb: "0.7em" }}>
              {t("bitesize.line1")}
            </Typography>
            <Typography variant="h4" sx={{ mb: "0.7em" }}>
              {t("bitesize.line2")}
            </Typography>
            <Typography variant="h4" sx={{ mb: "0.7em" }}>
              {t("bitesize.line3")}
            </Typography>
            <Typography variant="h4">{t("bitesize.line4")}</Typography>
          </Box>
        </Box>
      </Container>
      <Container
        component="section"
        maxWidth="md"
        sx={{ mt: { xs: 8, sm: 16 } }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: { xs: 2, md: 4 },
          }}
        >
          <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
            <Typography variant="body1">{t("history.paragraph1")}</Typography>
          </Box>
          <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
            <Typography variant="body1">{t("history.paragraph2")}</Typography>
          </Box>
        </Box>
      </Container>
      <Container
        component="section"
        maxWidth="md"
        sx={{ mt: { xs: 8, sm: 16 }, mb: { xs: 8, sm: 16 } }}
      >
        <Typography>The final section</Typography>
      </Container>
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
