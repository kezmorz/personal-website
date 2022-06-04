import Image from "next/image";
import { useTranslations } from "use-intl";
import { Container, Button, Typography, Box } from "@mui/material";
import { ArrowForwardOutlined as ArrowForwardOutlinedIcon } from "@mui/icons-material";
import { loader as cloudinaryImageLoader } from "@/lib/cloudinary";
import { pick } from "@/utils/misc";
import HtmlIcon from "@/icons/Html";
import CssIcon from "@/icons/Css";
import JavaScriptIcon from "@/icons/JavaScript";
import TypeScriptIcon from "@/icons/TypeScript";
import ReactIcon from "@/icons/React";
import MuiIcon from "@/icons/Mui";
import MantineIcon from "@/icons/Mantine";
import TailwindIcon from "@/icons/Tailwind";
import NextIcon from "@/icons/Next";
import NodeIcon from "@/icons/Node";
import ExpressIcon from "@/icons/Express";
import NestIcon from "@/icons/Nest";
import PrismaIcon from "@/icons/Prisma";
import TypeormIcon from "@/icons/Typeorm";
import StrapiIcon from "@/icons/Strapi";
import PostgresqlIcon from "@/icons/Postgresql";
import MongodbIcon from "@/icons/Mongodb";
import GitHubIcon from "@/icons/GitHub";
import GitHubActionsIcon from "@/icons/GitHubActions";
import AzureIcon from "@/icons/Azure";
import AzurePipelinesIcon from "@/icons/AzurePipelines";
import AwsIcon from "@/icons/Aws";
import VercelIcon from "@/icons/Vercel";
import Meta from "@/components/Meta";
import Header from "@/components/Header";
import { HobbyCard, SkillCard } from "@/components/Card";
import Link from "@/components/Link";
import Layout from "@/components/Layout";

const technology = [
  {
    name: "frontend",
    experience: [
      { name: "HTML", Icon: HtmlIcon },
      { name: "CSS", Icon: CssIcon },
      { name: "JavaScript", Icon: JavaScriptIcon },
      { name: "TypeScript", Icon: TypeScriptIcon },
      { name: "React", Icon: ReactIcon },
      { name: "MUI", Icon: MuiIcon },
      { name: "Mantine", Icon: MantineIcon },
      { name: "Tailwind CSS", Icon: TailwindIcon },
      { name: "Next.js", Icon: NextIcon },
    ],
  },
  {
    name: "backend",
    experience: [
      { name: "Node.js", Icon: NodeIcon },
      { name: "Express.js", Icon: ExpressIcon },
      { name: "NestJS", Icon: NestIcon },
      { name: "Prisma", Icon: PrismaIcon },
      { name: "TypeORM", Icon: TypeormIcon },
      { name: "Strapi", Icon: StrapiIcon },
      { name: "PostgreSQL", Icon: PostgresqlIcon },
      { name: "MongoDB", Icon: MongodbIcon },
    ],
  },
  {
    name: "devops",
    experience: [
      { name: "GitHub", Icon: GitHubIcon },
      { name: "GitHub Actions", Icon: GitHubActionsIcon },
      { name: "Azure", Icon: AzureIcon },
      { name: "Azure Pipelines", Icon: AzurePipelinesIcon },
      { name: "AWS", Icon: AwsIcon },
      { name: "Vercel", Icon: VercelIcon },
    ],
  },
];

const hobbies = [
  {
    name: "adventuring",
    image: {
      src: "pages/about/hobbies/adventuring.jpg",
      loader: cloudinaryImageLoader,
    },
  },
  {
    name: "sport",
    image: {
      src: "pages/about/hobbies/sport.jpg",
      loader: cloudinaryImageLoader,
    },
  },
  {
    name: "gaming",
    image: {
      src: "pages/about/hobbies/gaming.jpg",
      loader: cloudinaryImageLoader,
    },
  },
];

const About = () => {
  const t = useTranslations("about");

  return (
    <>
      <Meta
        title={t("metadata.title")}
        description={t("metadata.description")}
        type="website"
        image=""
      />
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
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { md: "center" },
            mt: { xs: 4, md: 8 },
          }}
        >
          <Typography variant="h5">
            {t("history.timeline.description")}
          </Typography>
          <Button
            component={Link}
            href="/timeline"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardOutlinedIcon />}
            sx={{ width: "fit-content", mt: { xs: 2, md: 0 } }}
          >
            {t("history.timeline.button")}
          </Button>
        </Box>
      </Container>
      <Container
        component="section"
        maxWidth="md"
        sx={{ mt: { xs: 8, sm: 16 } }}
      >
        <Box sx={{ width: "100%", maxHeight: { xs: 200, md: 300 } }}>
          {/* <Image
            src="pages/about/bitesize.jpg"
            alt="Something something something"
            width={827}
            height={1410}
            layout="responsive"
            loader={cloudinaryImageLoader}
          /> */}
        </Box>
      </Container>
      <Container
        component="section"
        maxWidth="lg"
        sx={{ mt: { xs: 8, sm: 16 } }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 852,
            mx: "auto",
            boxSizing: "border-box",
          }}
        >
          <Typography variant="h4">{t("techstack.description")}</Typography>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: { xs: 2, md: 4 },
            mt: { xs: 4, md: 8 },
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
                <Box key={name} sx={{ width: "100%", display: "inline-flex" }}>
                  <Box
                    component="span"
                    sx={{ display: "inline-flex", ml: -1, p: 1 }}
                  >
                    <Icon />
                  </Box>
                  <Typography
                    component="span"
                    variant="body1"
                    sx={{ pt: 1, pl: 1 }}
                  >
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
        sx={{ mt: { xs: 8, sm: 16 } }}
      >
        <Typography variant="h4">{t("hobbies.description")}</Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: { xs: 2, md: 4 },
            mt: { xs: 4, md: 8 },
          }}
        >
          {hobbies.map(({ name, image }) => (
            <HobbyCard
              key={name}
              heading={t(`hobbies.${name}.heading`)}
              description={t(`hobbies.${name}.description`)}
              imageProps={{ ...image, alt: "Something something something" }}
              sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}
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
