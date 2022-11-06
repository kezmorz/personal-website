import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "use-intl";
import { allSnippets } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import {
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ButtonBase,
  Button,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import {
  LayersOutlined as LayersOutlinedIcon,
  DevicesOutlined as DevicesOutlinedIcon,
  AccessibilityOutlined as AccessibilityOutlinedIcon,
  PeopleOutlined as PeopleOutlinedIcon,
  SquareFootOutlined as SquareFootOutlinedIcon,
  SportsRugbyOutlined as SportsRugbyOutlinedIcon,
  TerminalOutlined as TerminalOutlinedIcon,
  GroupsOutlined as GroupsOutlinedIcon,
  ExpandMoreOutlined as ExpandMoreOutlinedIcon,
  ArrowForwardOutlined as ArrowForwardOutlinedIcon,
  ArrowForwardIosOutlined as ArrowForwardIosOutlinedIcon,
  ArrowBackIosOutlined as ArrowBackIosOutlinedIcon,
} from "@mui/icons-material";
import { loader as cloudinaryImageLoader } from "@/lib/cloudinary";
import { wrap } from "@/utils/math";
import { pick } from "@/utils/misc";
import HtmlIcon from "@/icons/Html";
import CssIcon from "@/icons/Css";
import JavaScriptIcon from "@/icons/JavaScript";
import ReactIcon from "@/icons/React";
import NextIcon from "@/icons/Next";
import NodeIcon from "@/icons/Node";
import ExpressIcon from "@/icons/Express";
import PrismaIcon from "@/icons/Prisma";
import PostgresqlIcon from "@/icons/Postgresql";
import MongodbIcon from "@/icons/Mongodb";
import GitHubIcon from "@/icons/GitHub";
import AwsIcon from "@/icons/Aws";
import {
  Heading4 as MdxHeading4,
  Paragraph as MdxParagraph,
  OrderedList as MdxOrderedList,
  UnorderedList as MdxUnorderedList,
  ListItem as MdxListItem,
  Anchor as MdxAnchor,
  Pre as MdxPre,
} from "@/components/Markdown";
import Meta from "@/components/Meta";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import { CharacteristicCard, TestimonialCard } from "@/components/Card";
import StepEvent from "@/components/StepEvent";
import Carousel from "@/components/Carousel";
import Highlighter from "@/components/Highlighter";
import Emoji from "@/components/Emoji";
import Link from "@/components/Link";
import Layout from "@/components/Layout";

const characteristics = [
  { name: "fullstack", Icon: LayersOutlinedIcon },
  { name: "responsive", Icon: DevicesOutlinedIcon },
  { name: "accessible", Icon: AccessibilityOutlinedIcon },
  { name: "mentoring", Icon: PeopleOutlinedIcon },
];

const technology = {
  frontend: [
    { name: "HTML", Icon: HtmlIcon },
    { name: "CSS", Icon: CssIcon },
    { name: "JavaScript", Icon: JavaScriptIcon },
    { name: "React", Icon: ReactIcon },
    { name: "Next.js", Icon: NextIcon },
    { name: "GitHub", Icon: GitHubIcon },
  ],
  backend: [
    { name: "Node.js", Icon: NodeIcon },
    { name: "Express.js", Icon: ExpressIcon },
    { name: "Prisma", Icon: PrismaIcon },
    { name: "PostgreSQL", Icon: PostgresqlIcon },
    { name: "MongoDB", Icon: MongodbIcon },
    { name: "AWS", Icon: AwsIcon },
  ],
};

const events = [
  { name: "university", Icon: SquareFootOutlinedIcon },
  { name: "rugby", Icon: SportsRugbyOutlinedIcon },
  { name: "astra", Icon: TerminalOutlinedIcon },
  { name: "arup", Icon: GroupsOutlinedIcon },
];

const testimonials = [
  {
    quote:
      "Hello there, this is a very long quote that will take up quite a bit of the page. Hello there, this is a very long quote that will take up quite a bit of the page. Hello there, this is a very long quote that will take up quite a bit of the page.",
    profile: {
      name: "Rhian Powell",
      title: "Head Piggle",
      company: "Piggle Co.",
      imageProps: {
        src: "pages/about/hobbies/adventuring",
        alt: "Something something something",
        loader: cloudinaryImageLoader,
      },
    },
  },
  {
    quote:
      "Hello there, this is a very long quote that will take up quite a bit of the page. Hello there, this is a very long quote that will take up quite a bit of the page. Hello there, this is a very long quote that will take up quite a bit of the page. Hello there, this is a very long quote that will take up quite a bit of the page.",
    profile: {
      name: "Rhian Elizabeth Powell",
      title: "Chief Piggle",
      company: "Piggle Co.",
      imageProps: {
        src: "pages/about/hobbies/adventuring",
        alt: "Something something something",
        loader: cloudinaryImageLoader,
      },
    },
  },
  {
    quote:
      "This is a very long quote that will take up quite a bit of the page. Hello there, this is a very long quote that will take up quite a bit of the page. Hello there, this is a very long quote that will take up quite a bit of the page.",
    profile: {
      name: "Rhian DJ Lizzy Powell",
      title: "Chef Piggle",
      company: "Piggle Co.",
      imageProps: {
        src: "pages/about/hobbies/adventuring",
        alt: "Something something something",
        loader: cloudinaryImageLoader,
      },
    },
  },
];

const offerings = ["jobs", "mentoring", "questions"];

const components = {
  h4: (props) => <MdxHeading4 {...props} />,
  p: (props) => <MdxParagraph {...props} />,
  ol: (props) => <MdxOrderedList {...props} />,
  ul: (props) => <MdxUnorderedList {...props} />,
  li: (props) => <MdxListItem {...props} />,
  a: (props) => <MdxAnchor {...props} />,
  pre: (props) => <MdxPre {...props} />,
};

const Home = ({ snippets }) => {
  const [testimonialSlide, setTestimonialSlide] = useState(0);
  const [snippetPreview, setSnippetPreview] = useState(0);
  const t = useTranslations("home");
  const MdxComponent = useMDXComponent(snippets[snippetPreview].body.code);

  const handleTestimonialSlideChange = (testimonial) => {
    setTestimonialSlide(testimonial);
  };

  const handleSnippetPreviewChange = (snippet) => {
    setSnippetPreview(snippet);
  };

  return (
    <>
      <Meta
        title={t("metadata.title")}
        description={t("metadata.description")}
        type="website"
        image=""
      />
      <Hero
        heading={t("heading")}
        subheading={
          <>
            {`${t("subheading")} `}
            <Emoji symbol="🐉" label="dragon emoji" />
          </>
        }
        scroller={{ url: "/#about-section", label: t("scroller") }}
        imageProps={{
          src: "pages/home/hero",
          alt: "Something something something",
          sizes: "(min-width: 0px) 100vw, (min-width: 900px) 50vw",
          loader: cloudinaryImageLoader,
        }}
      />
      <Section id="about-section" maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: { xs: 2, md: 4 },
          }}
        >
          {characteristics.map(({ name, Icon }) => (
            <CharacteristicCard
              key={name}
              heading={t(`about.characteristics.${name}.heading`)}
              description={t(`about.characteristics.${name}.description`)}
              Icon={Icon}
              sx={{ gridColumn: { xs: "span 12", sm: "span 6", md: "span 3" } }}
            />
          ))}
        </Box>
        <Box
          sx={{
            width: "100%",
            maxWidth: 852,
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: { xs: 2, md: 4 },
            mx: "auto",
            mt: { xs: 4, md: 8 },
            boxSizing: "border-box",
          }}
        >
          <Box
            sx={{
              gridColumn: { xs: "span 12", md: "span 6" },
              position: "relative",
              width: "100%",
              height: { xs: 240, md: 304 },
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            <Image
              src="pages/home/coding"
              alt="Something something something"
              layout="fill"
              objectFit="cover"
              sizes="(min-width: 0px) 100vw, (min-width: 900px) 50vw"
              loader={cloudinaryImageLoader}
            />
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gap: { xs: 0, sm: 2, md: 4 },
              gridColumn: { xs: "span 12", md: "span 6" },
            }}
          >
            <Box sx={{ gridColumn: { xs: "span 12", sm: "span 6" } }}>
              {technology.frontend.map(({ name, Icon }) => (
                <Box
                  key={name}
                  sx={{
                    width: "100%",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      width: 48,
                      height: 48,
                      display: "inline-flex",
                      ml: -1,
                      p: 1,
                    }}
                  >
                    <Icon sx={{ width: "100%", height: "100%" }} />
                  </Box>
                  <Typography component="span" variant="h6" sx={{ pl: 1 }}>
                    {name}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Box sx={{ gridColumn: { xs: "span 12", sm: "span 6" } }}>
              {technology.backend.map(({ name, Icon }) => (
                <Box
                  key={name}
                  sx={{
                    width: "100%",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      width: 48,
                      height: 48,
                      display: "inline-flex",
                      ml: -1,
                      p: 1,
                    }}
                  >
                    <Icon sx={{ width: "100%", height: "100%" }} />
                  </Box>
                  <Typography component="span" variant="h6" sx={{ pl: 1 }}>
                    {name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            maxWidth: 852,
            mx: "auto",
            mt: { xs: 4, md: 8 },
            boxSizing: "border-box",
          }}
        >
          <Typography variant="h4" textAlign={{ xs: "left", md: "center" }}>
            {t("about.description")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "flex-start", md: "center" },
              alignItems: "center",
              mt: { xs: 4, md: 8 },
            }}
          >
            <Button
              component={Link}
              href="/about"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardOutlinedIcon />}
              sx={{ width: "fit-content" }}
            >
              {t("about.button")}
            </Button>
          </Box>
        </Box>
      </Section>
      <Section
        maxWidth={false}
        sx={{
          backgroundImage: (theme) =>
            `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${
              theme.palette.mode === "dark"
                ? theme.palette.primary[950]
                : theme.palette.primary[50]
            } 40%, ${
              theme.palette.mode === "dark"
                ? theme.palette.primary[950]
                : theme.palette.primary[50]
            } 70%, ${theme.palette.background.default} 90%)`,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 852,
            mx: "auto",
          }}
        >
          <Box
            sx={{
              display: { xs: "flex", sm: "none" },
              flexDirection: "column",
            }}
          >
            {events.map(({ name, Icon }) => (
              <StepEvent
                key={name}
                position="vertical"
                description={t(`timeline.events.${name}`)}
                Icon={Icon}
              />
            ))}
          </Box>
          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            {events.map(({ name, Icon }) => (
              <StepEvent
                key={name}
                position="horizontal"
                description={t(`timeline.events.${name}`)}
                Icon={Icon}
              />
            ))}
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gap: { xs: 2, md: 4 },
              mt: { xs: 4, md: 8 },
            }}
          >
            <Box
              sx={{
                gridColumn: { xs: "span 12", md: "span 6" },
                position: "relative",
                width: "100%",
                height: { xs: 272, md: 336 },
                borderRadius: 1,
                overflow: "hidden",
              }}
            >
              <Image
                src="pages/home/working"
                alt="Something something something"
                layout="fill"
                objectFit="cover"
                sizes="(min-width: 0px) 100vw, (min-width: 900px) 50vw"
                loader={cloudinaryImageLoader}
              />
            </Box>
            <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
              <Typography variant="h4" sx={{ mb: "0.7em" }}>
                {t("timeline.line1")}
              </Typography>
              <Typography variant="h4" sx={{ mb: "0.7em" }}>
                {t.rich("timeline.line2.description", {
                  link: (
                    <Link
                      key="virtual-engage-link"
                      href="https://www.arup.com/expertise/tools/virtual-engage"
                    >
                      {t("timeline.line2.link")}
                    </Link>
                  ),
                })}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "flex-start", md: "flex-end" },
                  alignItems: "center",
                  mt: { xs: 4, md: 8 },
                }}
              >
                <Button
                  component={Link}
                  href="/timeline"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardOutlinedIcon />}
                  sx={{ width: "fit-content" }}
                >
                  {t("timeline.button")}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Section>
      <Section maxWidth="md">
        <Typography
          variant="h4"
          textAlign={{ xs: "left", md: "center" }}
          sx={{ mb: "0.7em" }}
        >
          {t("testimonials.line1")}
        </Typography>
        <Typography
          variant="h4"
          textAlign={{ xs: "left", md: "center" }}
          sx={{ mb: "0.7em" }}
        >
          {t("testimonials.line2")}
        </Typography>
        <Box
          sx={{
            width: "100%",
            maxWidth: 600,
            mx: "auto",
          }}
        >
          <Carousel
            slide={testimonialSlide}
            onChange={handleTestimonialSlideChange}
            sx={{ height: { xs: 368, md: 304 } }}
          >
            {testimonials.map(({ quote, profile }) => (
              <TestimonialCard
                key={profile.name}
                quote={quote}
                profile={profile}
              />
            ))}
          </Carousel>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 2,
              mt: { xs: 2, md: 4 },
            }}
          >
            <Box sx={{ display: "flex" }}>
              <IconButton
                size="small"
                aria-label="previous testimonial"
                onClick={() =>
                  handleTestimonialSlideChange(testimonialSlide - 1)
                }
                sx={{ ml: -1 }}
              >
                <ArrowBackIosOutlinedIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                aria-label="next testimonial"
                onClick={() =>
                  handleTestimonialSlideChange(testimonialSlide + 1)
                }
                sx={{ ml: 2 }}
              >
                <ArrowForwardIosOutlinedIcon fontSize="small" />
              </IconButton>
            </Box>
            <Box sx={{ display: "flex" }}>
              {testimonials.map(({ profile: { name } }, index) => (
                <ButtonBase
                  key={name}
                  aria-label={`${name} testimonial`}
                  onClick={() =>
                    handleTestimonialSlideChange(
                      Math.floor(testimonialSlide / testimonials.length) *
                        testimonials.length +
                        index
                    )
                  }
                  sx={{
                    width: 16,
                    height: 16,
                    display: "inline-block",
                    p: "4px",
                    ml: 1,
                    borderRadius: "50%",
                    "&:hover": {
                      boxShadow: (theme) =>
                        `0px 0px 0px 2px ${theme.palette.action.hover}`,
                    },
                    "&.Mui-focusVisible": {
                      boxShadow: (theme) =>
                        `0px 0px 0px 2px ${theme.palette.action.focus}`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      borderRadius: "50%",
                      bgcolor:
                        index === wrap(0, testimonials.length, testimonialSlide)
                          ? "action.active"
                          : "action.disabled",
                    }}
                  />
                </ButtonBase>
              ))}
            </Box>
          </Box>
        </Box>
      </Section>
      <Section maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: { xs: 2, md: 4 },
          }}
        >
          <Box
            sx={{
              gridColumn: { xs: "1 / span 12", md: "1 / span 5" },
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h4"
              sx={{ display: { xs: "none", md: "block" }, mb: "0.7em" }}
            >
              {t("snippets.heading")}
            </Typography>
            {snippets.map(({ title, description, slug }, index) => (
              <Box
                key={title}
                sx={{ position: "relative", mt: { xs: 1, md: 2 } }}
              >
                <Highlighter
                  selected={index === snippetPreview}
                  onClick={() => handleSnippetPreviewChange(index)}
                  sx={{
                    width: "100%",
                    pb: 6,
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      p: 2,
                    }}
                  >
                    <Typography component="span" variant="h6" gutterBottom>
                      {title}
                    </Typography>
                    <Typography
                      component="span"
                      variant="body1"
                      color="text.secondary"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        ...(index !== snippetPreview && {
                          whiteSpace: { xs: "nowrap", md: "normal" },
                        }),
                      }}
                    >
                      {description}
                    </Typography>
                  </Box>
                </Highlighter>
                <Button
                  component={Link}
                  href={`/snippets/${slug}`}
                  variant="contained"
                  size="small"
                  color="secondary"
                  endIcon={<ArrowForwardOutlinedIcon />}
                  sx={{ position: "absolute", bottom: 16, right: 16 }}
                >
                  {t("snippets.preview")}
                </Button>
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              gridColumn: { xs: "span 12", md: "6 / span 7" },
              gridRowStart: { xs: 1 },
              width: "100%",
              height: "100%",
            }}
          >
            <Typography
              variant="h4"
              sx={{ display: { md: "none" }, mb: "0.7em" }}
            >
              {t("snippets.heading")}
            </Typography>
            <Paper
              variant="outlined"
              sx={{
                width: "100%",
                height: "100%",
                maxHeight: { xs: 480, md: 680 },
                bgcolor: "unset",
                overflowY: "hidden",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  p: 2,
                  overflowY: "auto",
                  scrollbarWidth: "thin",
                  scrollbarColor: (theme) =>
                    `${theme.palette.divider} transparent`,
                  "&::-webkit-scrollbar": {
                    width: 8,
                    height: 8,
                    backgroundColor: "transparent",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "scrollbar",
                  },
                }}
              >
                <MdxComponent key={snippetPreview} components={components} />
              </Box>
            </Paper>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            maxWidth: 852,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { md: "center" },
            mx: "auto",
            mt: { xs: 4, md: 8 },
            boxSizing: "border-box",
          }}
        >
          <Typography variant="h5">
            {t("snippets.information.description")}
          </Typography>
          <Button
            component={Link}
            href="/snippets"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardOutlinedIcon />}
            sx={{ width: "fit-content", mt: { xs: 2, md: 0 } }}
          >
            {t("snippets.information.button")}
          </Button>
        </Box>
      </Section>
      <Section
        maxWidth={false}
        extendBottomPadding
        sx={{
          backgroundImage: (theme) =>
            `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${
              theme.palette.mode === "dark"
                ? theme.palette.primary[950]
                : theme.palette.primary[50]
            } 40%, ${
              theme.palette.mode === "dark"
                ? theme.palette.primary[950]
                : theme.palette.primary[50]
            } 70%, ${theme.palette.background.default} 90%)`,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 852,
            mx: "auto",
          }}
        >
          <Typography
            variant="h4"
            textAlign={{ xs: "left", md: "center" }}
            sx={{ mb: "0.7em" }}
          >
            {t("contact.heading")}
          </Typography>
          <Box sx={{ mt: { xs: 4, md: 8 } }}>
            {offerings.map((offering) => (
              <Accordion
                key={offering}
                disableGutters
                sx={{
                  mt: { xs: 2, md: 4 },
                  borderRadius: 1,
                  "&:before": {
                    display: "none",
                  },
                  "&:first-of-type": {
                    mt: 0,
                  },
                }}
              >
                <AccordionSummary
                  id={`contact-${offering}-header`}
                  expandIcon={<ExpandMoreOutlinedIcon />}
                  aria-controls={`contact-${offering}-content`}
                  sx={{ minHeight: { xs: 64, md: 80 } }}
                >
                  <Typography variant="h5">
                    {t(`contact.offerings.${offering}.heading`)}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    p: 2,
                    borderBottomLeftRadius: (theme) => theme.shape.borderRadius,
                    borderBottomRightRadius: (theme) =>
                      theme.shape.borderRadius,
                    bgcolor: "background.default",
                  }}
                >
                  <Typography variant="body1">
                    {t(`contact.offerings.${offering}.description`)}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "flex-start", md: "center" },
              alignItems: "center",
              mt: { xs: 4, md: 8 },
            }}
          >
            <Button
              component={Link}
              href="/contact"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardOutlinedIcon />}
              sx={{ width: "fit-content" }}
            >
              {t("contact.button")}
            </Button>
          </Box>
        </Box>
      </Section>
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
      snippets: allSnippets
        .filter(({ locale: snippetLocale }) => snippetLocale === locale)
        .map(({ title, description, tags, publishedAt, body, slug }) => ({
          title,
          description,
          tags,
          publishedAt,
          body,
          slug,
        }))
        .sort(
          (
            { publishedAt: snippetOnePublishedAt },
            { publishedAt: snippetTwoPublishedAt }
          ) =>
            Number(new Date(snippetTwoPublishedAt)) -
            Number(new Date(snippetOnePublishedAt))
        )
        .slice(0, 3),
      messages: pick(
        await import(`../translations/${locale}.json`),
        Home.messages
      ),
    },
  };
};

export default Home;
