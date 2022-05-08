import { useTranslations } from "use-intl";
import { Container, Box } from "@mui/material";
import { loader as cloudinaryImageLoader } from "@/lib/cloudinary";
import { pick } from "@/utils/misc";
import Header from "@/components/Header";
import TimelineEvent from "@/components/TimelineEvent";
import Layout from "@/components/Layout";

const events = [
  { variant: "work", name: "test", date: "2022-04-01" },
  { variant: "work", name: "test", date: "2022-04-01" },
  { variant: "work", name: "test", date: "2022-04-01" },
  { variant: "work", name: "test", date: "2022-04-01" },
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
              description={t(`events.${name}.description`)}
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
              description={t(`events.${name}.description`)}
              date={date}
              position="alternate"
            />
          ))}
        </Box>
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
