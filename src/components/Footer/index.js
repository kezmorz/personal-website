import useSwr from "swr";
import { useTranslations } from "use-intl";
import {
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import {
  EmailOutlined as EmailOutlinedIcon,
  ExpandMoreOutlined as ExpandMoreOutlinedIcon,
} from "@mui/icons-material";
import { loader as flickrImageLoader } from "@/lib/flickr";
import fetcher from "@/services/fetcher";
import GitHubIcon from "@/icons/GitHub";
import LinkedInIcon from "@/icons/LinkedIn";
import SpotifyIcon from "@/icons/Spotify";
import Link from "@/components/Link";
import FancyLink from "@/components/FancyLink";
import Image from "@/components/Image";

const pages = {
  info: [
    { name: "home", link: "/" },
    { name: "about", link: "/about" },
    { name: "timeline", link: "/timeline" },
  ],
  misc: [
    { name: "snippets", link: "/snippets" },
    { name: "contact", link: "/contact" },
  ],
};

const Footer = () => {
  const { data: spotifyData } = useSwr("/api/spotify/now-playing", fetcher);
  const { data: flickrData } = useSwr("/api/flickr/random-photo", fetcher);
  const t = useTranslations("footer");

  return (
    <Box component="footer">
      <Divider light />
      <Container
        maxWidth="lg"
        sx={{ mt: { xs: 12, sm: 24 }, mb: { xs: 3, sm: 6 } }}
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
            <Box sx={{ display: "flex", mb: "0.35em" }}>
              <IconButton
                href="https://github.com/kezmorz"
                target="_blank"
                rel="noopener"
                aria-label="go to github profile"
                sx={{ ml: -1 }}
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                href="https://www.linkedin.com/in/cerimorse"
                target="_blank"
                rel="noopener"
                aria-label="go to linkedin profile"
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                href="mailto:enterprise@mxrse.com"
                target="_blank"
                rel="noopener"
                aria-label="send email"
              >
                <EmailOutlinedIcon />
              </IconButton>
            </Box>
            <Box sx={{ width: "100%", display: "inline-flex" }}>
              <Box
                component="span"
                sx={{ display: "inline-flex", ml: -1, p: 1 }}
              >
                <SpotifyIcon />
              </Box>
              {spotifyData?.isPlaying ? (
                <Typography
                  component="span"
                  variant="body1"
                  sx={{
                    pt: 1,
                    pl: 1,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Link href={spotifyData.songUrl} underline="hover">
                    {spotifyData.title}
                  </Link>
                  {` - ${spotifyData.artist}`}
                </Typography>
              ) : (
                <Typography
                  component="span"
                  variant="body1"
                  sx={{
                    pt: 1,
                    pl: 1,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {t("notPlaying")}
                </Typography>
              )}
            </Box>
          </Box>
          <Box sx={{ gridColumn: { xs: "span 12", md: "span 4" } }}>
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <Typography variant="h5" gutterBottom>
                {t("sitemap.heading")}
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(8, 1fr)",
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
                        mb: 1,
                        "&.active::after": {
                          transform: "scale(0)",
                        },
                        "&:hover::after, &.Mui-focusVisible::after": {
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
                        mb: 1,
                        "&.active::after": {
                          transform: "scale(0)",
                        },
                        "&:hover::after, &.Mui-focusVisible::after": {
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
            <Box sx={{ display: { xs: "block", md: "none" } }}>
              <Divider />
              <Accordion
                disableGutters
                variant="elevation"
                square
                sx={{ bgcolor: "background.default" }}
              >
                <AccordionSummary
                  id="sitemap-header"
                  expandIcon={<ExpandMoreOutlinedIcon />}
                  aria-controls="sitemap-content"
                  sx={{ p: 0 }}
                >
                  <Typography variant="h5">{t("sitemap.heading")}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 0, px: 0 }}>
                  <List>
                    {pages.info.map(({ name, link }) => (
                      <ListItem key={name} disablePadding>
                        <ListItemButton
                          component={Link}
                          href={link}
                          underline="none"
                          sx={{
                            px: 0,
                            py: 1,
                            "&:hover": { color: "currentcolor" },
                          }}
                        >
                          <ListItemText primary={t(`sitemap.pages.${name}`)} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                    {pages.misc.map(({ name, link }) => (
                      <ListItem key={name} disablePadding>
                        <ListItemButton
                          component={Link}
                          href={link}
                          underline="none"
                          sx={{
                            px: 0,
                            py: 1,
                            "&:hover": { color: "currentcolor" },
                          }}
                        >
                          <ListItemText primary={t(`sitemap.pages.${name}`)} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
              <Divider />
            </Box>
          </Box>
          <Box sx={{ gridColumn: { xs: "span 12", md: "span 2" } }}>
            <Typography variant="h5" gutterBottom>
              {t("art")}
            </Typography>
            {flickrData && (
              <Link href={`https://www.flickr.com/photos/${flickrData.owner}`}>
                <Box sx={{ position: "relative", height: 96 }}>
                  <Image
                    src={`${flickrData.server}/${flickrData.id}_${flickrData.secret}.jpg`}
                    alt={flickrData.title}
                    fill
                    sizes="(min-width: 0px) 100vw, (min-width: 900px) 20vw"
                    loader={flickrImageLoader}
                    sx={{ objectFit: "cover" }}
                  />
                </Box>
              </Link>
            )}
          </Box>
          <Box sx={{ gridColumn: { xs: "span 12" } }}>
            <Typography variant="body1">
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
