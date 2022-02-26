import { useTranslations } from "use-intl";
import { Box, Container, Divider, IconButton, Typography } from "@mui/material";
import {
  GitHub as GithubIcon,
  LinkedIn as LinkedInIcon,
  EmailOutlined as EmailOutlinedIcon,
} from "@mui/icons-material";
import FancyLink from "@/components/FancyLink";

const pages = {
  info: [
    { name: "home", link: "/" },
    { name: "about", link: "/about" },
    { name: "resume", link: "/resume" },
  ],
  misc: [
    { name: "snippets", link: "/snippets" },
    { name: "contact", link: "/contact" },
  ],
};

const Footer = () => {
  const t = useTranslations("footer");

  return (
    <Box component="footer">
      <Divider light />
      <Container
        maxWidth="lg"
        sx={{ mt: { xs: 8, sm: 16 }, mb: { xs: 2, sm: 4 } }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: { xs: 2, md: 4 },
          }}
        >
          <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
            <Typography variant="h5" gutterBottom>
              Ceri Morse
            </Typography>
            <Typography variant="body1" gutterBottom>
              {t("tagline")}
            </Typography>
            <Box sx={{ display: "flex" }}>
              <IconButton sx={{ ml: -1 }}>
                <GithubIcon />
              </IconButton>
              <IconButton>
                <LinkedInIcon />
              </IconButton>
              <IconButton>
                <EmailOutlinedIcon />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
            <Typography variant="h5" gutterBottom>
              {t("sitemap.heading")}
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(12, 1fr)",
                gap: { xs: 2, md: 4 },
              }}
            >
              <Box sx={{ gridColumn: { xs: "span 12", md: "span 4" } }}>
                {pages.info.map(({ name, link }) => (
                  <FancyLink
                    key={name}
                    href={link}
                    color="textPrimary"
                    sx={{
                      width: "fit-content",
                      "&.active::after": {
                        transform: "scale(0)",
                      },
                      "&:hover::after, &:focus::after": {
                        transform: "scale(1)",
                      },
                    }}
                  >
                    {t(`sitemap.pages.${name}`)}
                  </FancyLink>
                ))}
              </Box>
              <Box sx={{ gridColumn: { xs: "span 12", md: "span 4" } }}>
                {pages.misc.map(({ name, link }) => (
                  <FancyLink
                    key={name}
                    href={link}
                    color="textPrimary"
                    sx={{
                      width: "fit-content",
                      "&.active::after": {
                        transform: "scale(0)",
                      },
                      "&:hover::after, &:focus::after": {
                        transform: "scale(1)",
                      },
                    }}
                  >
                    {t(`sitemap.pages.${name}`)}
                  </FancyLink>
                ))}
              </Box>
            </Box>
          </Box>
          <Box sx={{ gridColumn: { xs: "span 12" } }}>
            <Typography>
              {t("copyright", { year: new Date().getFullYear() })}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

Footer.messages = ["footer"];

Footer.propTypes = {};

export default Footer;
