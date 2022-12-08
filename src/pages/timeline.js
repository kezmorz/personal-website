import { useState } from "react";
import { useTranslations } from "use-intl";
import { Autocomplete, TextField, Typography, Box } from "@mui/material";
import { loader as cloudinaryImageLoader } from "@/lib/cloudinary";
import { pick } from "@/utils/misc";
import Meta from "@/components/Meta";
import Header from "@/components/Header";
import Section from "@/components/Section";
import TimelineEvent from "@/components/TimelineEvent";
import Layout from "@/components/Layout";

const events = [
  { variant: "work", name: "arupSenior", date: "2022-04-01" },
  { variant: "work", name: "arupReactCommunity", date: "2022-03-31" },
  { variant: "work", name: "arupPeiLutonAirport", date: "2022-02-04" },
  { variant: "work", name: "arupPeiA66", date: "2021-09-24" },
  { variant: "work", name: "arupPublicInquiryA55", date: "2021-07-20" },
  { variant: "award", name: "arupVirtualEngageAward", date: "2020-11-23" },
  { variant: "work", name: "arupPeiTemplate", date: "2020-10-13" },
  { variant: "work", name: "arupPeiA417", date: "2020-10-12" },
  { variant: "training", name: "arupTrainingAzure", date: "2020-07-20" },
  { variant: "mentor", name: "arupMentor", date: "2020-06-29" },
  { variant: "work", name: "arupVirtualEngage", date: "2020-04-08" },
  { variant: "work", name: "arupGitHub", date: "2020-04-02" },
  { variant: "training", name: "arupTrainingReact", date: "2020-03-09" },
  { variant: "work", name: "arupPublicInquiryTemplate", date: "2020-01-15" },
  { variant: "work", name: "arupPublicInquiryA40", date: "2020-01-14" },
  { variant: "training", name: "arupTrainingAws", date: "2019-12-02" },
  { variant: "work", name: "arupDigitalSurgeries", date: "2019-11-22" },
  { variant: "work", name: "arupStart", date: "2019-10-14" },
  { variant: "training", name: "astraOnlineTrainingSofia", date: "2018-08-21" },
  {
    variant: "training",
    name: "astraOnlineTrainingGreentubeTwo",
    date: "2018-07-09",
  },
  { variant: "work", name: "astraOnlineGame", date: "2050-10-10" },
  {
    variant: "training",
    name: "astraOnlineTrainingGreentubeOne",
    date: "2017-05-22",
  },
  { variant: "work", name: "astraOnline", date: "2017-05-08" },
  { variant: "work", name: "astraRouletteGame", date: "2017-04-28" },
  { variant: "work", name: "astraMid", date: "2015-01-01" },
  { variant: "work", name: "astraStart", date: "2013-09-16" },
  { variant: "education", name: "uniGraduate", date: "2013-05-31" },
  { variant: "education", name: "uniReturn", date: "2012-10-01" },
  { variant: "work", name: "cassidianPlacement", date: "2011-09-01" },
  { variant: "education", name: "uniStart", date: "2009-09-28" },
];

const Timeline = () => {
  const [categories, setCategories] = useState([]);
  const t = useTranslations("timeline");

  const handleCategoriesChange = (_, newValue) => {
    setCategories(newValue);
  };

  const categoryOptions = [...new Set(events.map((event) => event.variant))];

  const selectedEvents = events.filter(
    ({ variant }) => !categories.length || categories.includes(variant)
  );

  return (
    <>
      <Meta
        title={t("metadata.title")}
        description={t("metadata.description")}
        type="website"
      />
      <Header
        heading={t("header.heading")}
        subheading={t("header.subheading")}
        imageProps={{
          src: t("header.image.src"),
          alt: t("header.image.alt"),
          width: 1160,
          height: 727,
          loader: cloudinaryImageLoader,
        }}
        direction="rtl"
      />
      <Section maxWidth="md" extendBottomPadding>
        <Typography variant="h4">{t("description")}</Typography>
        <Autocomplete
          id="timeline-categories"
          multiple
          fullWidth
          options={categoryOptions}
          value={categories}
          getOptionLabel={(option) => t(`categories.values.${option}`)}
          onChange={handleCategoriesChange}
          renderInput={(params) => (
            <TextField {...params} label={t("categories.label")} />
          )}
          sx={{ mt: { xs: 4, md: 8 } }}
        />
        <Box
          component="ul"
          sx={{
            display: { xs: "flex", md: "none" },
            flexDirection: "column",
            mt: { xs: 4, md: 8 },
            p: 0,
          }}
        >
          {selectedEvents.map(({ variant, name, date }) => (
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
            mt: { xs: 4, md: 8 },
            p: 0,
          }}
        >
          {selectedEvents.map(({ variant, name, date }) => (
            <TimelineEvent
              key={name}
              variant={variant}
              description={t(`events.${name}`)}
              date={date}
              position="alternate"
            />
          ))}
        </Box>
      </Section>
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

Timeline.messages = ["timeline", ...TimelineEvent.messages, ...Layout.messages];

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
