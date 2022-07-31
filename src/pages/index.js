import { useState } from "react";
import { useTranslations } from "use-intl";
import { allSnippets } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import {
  Container,
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
import { CharacteristicCard, TestimonialCard } from "@/components/Card";
import StepEvent from "@/components/StepEvent";
import Carousel from "@/components/Carousel";
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
        src: "pages/about/hobbies/adventuring.jpg",
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
        src: "pages/about/hobbies/adventuring.jpg",
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
        src: "pages/about/hobbies/adventuring.jpg",
        alt: "Something something something",
        loader: cloudinaryImageLoader,
      },
    },
  },
];

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
          <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
            Put a picture of me here
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
          <Typography variant="h4">{t("about.description")}</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
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
      </Container>
      <Container
        component="section"
        maxWidth="md"
        sx={{ mt: { xs: 8, sm: 16 } }}
      >
        <Box
          sx={{ display: { xs: "flex", sm: "none" }, flexDirection: "column" }}
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
          <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
            Image Goes Here
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
                    underline="hover"
                  >
                    {t("timeline.line2.link")}
                  </Link>
                ),
              })}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
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
      </Container>
      <Container
        component="section"
        maxWidth="md"
        sx={{ mt: { xs: 8, sm: 16 } }}
      >
        <Typography variant="h4" sx={{ mb: "0.7em" }}>
          {t("testimonials.line1")}
        </Typography>
        <Typography variant="h4" sx={{ mb: "0.7em" }}>
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
          <Box
            sx={{
              gridColumn: { xs: "span 12", md: "span 5" },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h4" sx={{ mb: "0.7em" }}>
              {t("snippets.heading")}
            </Typography>
            {snippets.map(({ title, description, slug }, index) => (
              <ButtonBase
                key={title}
                onClick={() => setSnippetPreview(index)}
                sx={{
                  justifyContent: "flex-start",
                  textAlign: "left",
                  mt: { xs: 1, md: 2 },
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
                  <Typography component="span" variant="body1">
                    {description}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      mt: { xs: 1, md: 2 },
                    }}
                  >
                    <Button
                      component={Link}
                      href={`/snippets/${slug}`}
                      variant="contained"
                      size="small"
                      endIcon={<ArrowForwardOutlinedIcon />}
                      sx={{ width: "fit-content" }}
                    >
                      {t("snippets.preview")}
                    </Button>
                  </Box>
                </Box>
              </ButtonBase>
            ))}
          </Box>
          <Box sx={{ gridColumn: { xs: "span 12", md: "span 7" } }}>
            <Box sx={{ maxHeight: 680, overflowY: "auto" }}>
              <MdxComponent components={components} />
            </Box>
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
      </Container>
      <Container
        component="section"
        maxWidth="md"
        sx={{ mt: { xs: 8, sm: 16 }, mb: { xs: 8, sm: 16 } }}
      >
        <Box
          sx={{
            maxWidth: 600,
            p: 2,
            mx: "auto",
            border: 1,
            borderColor: "primary.main",
            borderRadius: 1,
          }}
        >
          <Typography variant="h4" sx={{ mb: "0.7em" }}>
            {t("contact.heading")}
          </Typography>
          <Typography variant="body1" sx={{ mb: "0.7em" }}>
            {t("contact.description")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              mt: { xs: 2, md: 4 },
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
      </Container>
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
