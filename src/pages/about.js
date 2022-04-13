import Image from "next/image";
import { useTranslations } from "use-intl";
import { Container, Typography, Box } from "@mui/material";
import { loader as cloudinaryImageLoader } from "@/lib/cloudinary";
import { pick } from "@/utils/misc";
import Header from "@/components/Header";
import SkillCard from "@/components/SkillCard";
import Layout from "@/components/Layout";

import SpotifyIcon from "@/icons/Spotify";

const technology = [
  {
    name: "frontend",
    experience: [
      { name: "HTML", Icon: SpotifyIcon },
      { name: "CSS", Icon: SpotifyIcon },
      { name: "JavaScript", Icon: SpotifyIcon },
      { name: "TypeScript", Icon: SpotifyIcon },
      { name: "React", Icon: SpotifyIcon },
      { name: "MUI", Icon: SpotifyIcon },
      { name: "Mantine", Icon: SpotifyIcon },
      { name: "Tailwind CSS", Icon: SpotifyIcon },
      { name: "Next.js", Icon: SpotifyIcon },
    ],
  },
  {
    name: "backend",
    experience: [
      { name: "Node.js", Icon: SpotifyIcon },
      { name: "Express.js", Icon: SpotifyIcon },
      { name: "NestJS", Icon: SpotifyIcon },
      { name: "Prisma", Icon: SpotifyIcon },
      { name: "TypeORM", Icon: SpotifyIcon },
      { name: "Strapi", Icon: SpotifyIcon },
      { name: "PostgreSQL", Icon: SpotifyIcon },
      { name: "MongDB", Icon: SpotifyIcon },
    ],
  },
  {
    name: "infrastructure",
    experience: [
      { name: "GitHub", Icon: SpotifyIcon },
      { name: "GitHub Actions", Icon: SpotifyIcon },
      { name: "Azure", Icon: SpotifyIcon },
      { name: "Azure Pipelines", Icon: SpotifyIcon },
      { name: "AWS", Icon: SpotifyIcon },
    ],
  },
];

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
        maxWidth="lg"
        sx={{ mt: { xs: 8, sm: 16 } }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: { xs: 2, md: 4 },
          }}
        >
          {technology.map(({ name, experience }) => (
            <SkillCard
              key={name}
              heading={t(`techstack.${name}.heading`)}
              description={t(`techstack.${name}.description`)}
              sx={{ gridColumn: { xs: "span 12", md: "span 4" } }}
            >
              {experience.map(({ name, Icon }) => (
                <Box key={name} sx={{ display: "inline-flex", mb: 2 }}>
                  <Icon />
                  <Typography variant="body1" sx={{ ml: 2 }}>
                    {name}
                  </Typography>
                </Box>
              ))}
            </SkillCard>
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
