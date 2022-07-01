import { useState } from "react";
import { useTranslations } from "use-intl";
import { allSnippets } from "contentlayer/generated";
import { Container, Button, IconButton, Typography, Box } from "@mui/material";
import {
  ArrowForwardOutlined as ArrowForwardOutlinedIcon,
  ArrowForwardIosOutlined as ArrowForwardIosOutlinedIcon,
  ArrowBackIosOutlined as ArrowBackIosOutlinedIcon,
} from "@mui/icons-material";
import { loader as cloudinaryImageLoader } from "@/lib/cloudinary";
import { wrap } from "@/utils/math";
import { pick } from "@/utils/misc";
import Meta from "@/components/Meta";
import { FancySnippetCard, TestimonialCard } from "@/components/Card";
import Link from "@/components/Link";
import Layout from "@/components/Layout";

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
      name: "Rhian Powell",
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
      "Hello there, this is a very long quote that will take up quite a bit of the page. Hello there, this is a very long quote that will take up quite a bit of the page. Hello there, this is a very long quote that will take up quite a bit of the page.",
    profile: {
      name: "Rhian Powell",
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

const Home = ({ snippets }) => {
  const [testimonial, setTestimonial] = useState(0);
  const t = useTranslations("home");

  const handleTestimonialChange = (direction) => {
    setTestimonial((prevTestimonial) =>
      wrap(0, testimonials.length, prevTestimonial + direction)
    );
  };

  return (
    <>
      <Meta
        title={t("metadata.title")}
        description={t("metadata.description")}
        type="website"
        image=""
      />
      <Container component="section" maxWidth="md">
        About Me
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
                flexDirection: "row",
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
          {t("snippets.line1")}
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: { xs: 2, md: 4 },
            mt: { xs: 4, md: 8 },
          }}
        >
          {snippets.map(({ title, publishedAt, slug }) => (
            <FancySnippetCard
              key={slug}
              heading={title}
              date={publishedAt}
              href={`/snippets/${slug}`}
              sx={{
                gridColumn: { xs: "span 12", md: "span 4" },
                minHeight: { xs: 120, md: 240 },
              }}
            />
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
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
            {t("snippets.button")}
          </Button>
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
            mt: { xs: 4, md: 8 },
          }}
        >
          <Box sx={{ display: "flex" }}>
            <TestimonialCard
              quote={testimonials[testimonial].quote}
              profile={testimonials[testimonial].profile}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: { md: "center" },
              px: 2,
              mt: { xs: 2, md: 4 },
            }}
          >
            <Box sx={{ display: "flex" }}>
              <IconButton
                size="small"
                aria-label="previous testimonial"
                onClick={() => handleTestimonialChange(-1)}
                sx={{ ml: -1 }}
              >
                <ArrowBackIosOutlinedIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                aria-label="next testimonial"
                onClick={() => handleTestimonialChange(1)}
                sx={{ ml: 2 }}
              >
                <ArrowForwardIosOutlinedIcon fontSize="small" />
              </IconButton>
            </Box>
            <Box sx={{ display: "flex" }}></Box>
          </Box>
        </Box>
      </Container>
      <Container
        component="section"
        maxWidth="md"
        sx={{ mt: { xs: 8, sm: 16 } }}
      >
        Collaboration section
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
        .map(({ title, description, tags, publishedAt, slug }) => ({
          title,
          description,
          tags,
          publishedAt,
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
