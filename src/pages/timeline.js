import { useTranslations } from "use-intl";
import { Container, Typography, Box } from "@mui/material";
import { loader as cloudinaryImageLoader } from "@/lib/cloudinary";
import { pick } from "@/utils/misc";
import Header from "@/components/Header";
import TimelineEvent from "@/components/TimelineEvent";
import Layout from "@/components/Layout";

const events = [
  { variant: "work", name: "arupSenior", date: "2022-04-01" },
  { variant: "award", name: "arupVirtualEngageAward", date: "2020-11-23" },
  { variant: "work", name: "arupStart", date: "2019-10-14" },
  { variant: "work", name: "astraOnline", date: "2017-05-08" },
  { variant: "work", name: "astraMid", date: "2015-01-01" },
  { variant: "work", name: "astraStart", date: "2013-09-16" },
  { variant: "education", name: "uniGraduate", date: "2013-05-31" },
  { variant: "education", name: "uniReturn", date: "2012-10-01" },
  { variant: "work", name: "cassidianPlacement", date: "2011-09-01" },
  { variant: "education", name: "uniStart", date: "2009-09-28" },
];

const Timeline = () => {
  const t = useTranslations("timeline");

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
          component="ul"
          sx={{
            display: { xs: "flex", md: "none" },
            flexDirection: "column",
            m: 0,
            p: 0,
          }}
        >
          {events.map(({ variant, name, date }) => (
            <TimelineEvent
              key={name}
              variant={variant}
              description={t(`events.${name}`)}
              date={date}
              position="right"
            />
          ))}
        </Box>
        <Box
          component="ul"
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            m: 0,
            p: 0,
          }}
        >
          {events.map(({ variant, name, date }) => (
            <TimelineEvent
              key={name}
              variant={variant}
              description={t(`events.${name}`)}
              date={date}
              position="alternate"
            />
          ))}
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
