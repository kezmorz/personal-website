import PropTypes from "prop-types";
import { Container, IconButton, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ArrowDownwardOutlined as ArrowDownwardOutlinedIcon } from "@mui/icons-material";
import { motion } from "framer-motion";
import Link from "@/components/Link";
import Image from "@/components/Image";

const containerVariants = {
  initial: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const textVariants = {
  initial: {
    opacity: 0,
    x: -48,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const scrollerVariants = {
  initial: {
    opacity: 0,
    y: 48,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const AnimatedDiv = styled(motion.div)({});

const Hero = ({ heading, subheading, scroller, imageProps }) => {
  const { url: scrollerUrl, label: scrollerLabel } = scroller ?? {};

  return (
    <Box component="header">
      <Container
        maxWidth="lg"
        sx={{ mt: { xs: 6, sm: 12 }, mb: { xs: 6, sm: 12 } }}
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
              gridRowStart: { md: 1 },
              gridColumn: { xs: "1 / span 12", md: "8 / span 5" },
              display: "flex",
              justifyContent: "center",
            }}
          >
            <AnimatedDiv
              initial={{ opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75 }}
              sx={{
                position: "relative",
                width: "100%",
                height: 576,
                display: "block",
                filter: (theme) =>
                  `drop-shadow(0 -16px 32px ${theme.palette.primary.main})`,
              }}
            >
              <Image
                priority
                fill
                sizes="(min-width: 0px) 100vw, (min-width: 900px) 50vw"
                sx={{ objectFit: "contain" }}
                {...imageProps}
              />
            </AnimatedDiv>
          </Box>
          <AnimatedDiv
            variants={containerVariants}
            initial="initial"
            animate="visible"
            sx={{
              gridRowStart: { md: 1 },
              gridColumn: { xs: "span 12", md: "1 / span 7" },
              pt: { md: 8 },
            }}
          >
            <AnimatedDiv variants={textVariants}>
              <Typography
                variant="h1"
                fontWeight={500}
                gutterBottom
                sx={{
                  background: (theme) =>
                    `-webkit-linear-gradient(315deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {heading}
              </Typography>
            </AnimatedDiv>
            {subheading && (
              <AnimatedDiv variants={textVariants}>
                <Typography variant="h2" fontWeight={500} gutterBottom>
                  {subheading}
                </Typography>
              </AnimatedDiv>
            )}
            {scroller && (
              <AnimatedDiv
                variants={scrollerVariants}
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                  pt: { md: 8 },
                }}
              >
                <Typography component="span" variant="h4">
                  {scrollerLabel}
                </Typography>
                <IconButton
                  component={Link}
                  href={scrollerUrl}
                  size="large"
                  aria-label="scroll to element"
                  sx={{ ml: 2, "&:hover": { color: "currentcolor" } }}
                >
                  <ArrowDownwardOutlinedIcon />
                </IconButton>
              </AnimatedDiv>
            )}
          </AnimatedDiv>
        </Box>
      </Container>
    </Box>
  );
};

Hero.propTypes = {
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.node,
  scroller: PropTypes.shape({
    url: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  imageProps: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    sizes: PropTypes.string,
    loader: PropTypes.func,
  }),
};

export default Hero;
