import { useTranslations } from "use-intl";
import { Container, Button, Typography, Box } from "@mui/material";
import { ArrowForwardOutlined as ArrowForwardOutlinedIcon } from "@mui/icons-material";
import { pick } from "@/utils/misc";
import Meta from "@/components/Meta";
import Link from "@/components/Link";
import Layout from "@/components/Layout";

const Home = () => {
  const t = useTranslations("home");

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
        Recently released snippets
      </Container>
      <Container
        component="section"
        maxWidth="md"
        sx={{ mt: { xs: 8, sm: 16 } }}
      >
        Testimonials
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
      messages: pick(
        await import(`../translations/${locale}.json`),
        Home.messages
      ),
    },
  };
};

export default Home;
