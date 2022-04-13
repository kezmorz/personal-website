import PropTypes from "prop-types";
import Image from "next/image";
import { Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const AnimatedTypography = styled(Typography)({
  animationName: "rotatein",
  animationDuration: "0.75s",
  animationFillMode: "both",
  "@keyframes rotatein": {
    "0%": {
      opacity: 0,
      transform: "rotateX(90deg)",
    },
    "100%": {
      opacity: 1,
      transform: "rotateX(0deg)",
    },
  },
});

const AnimatedImage = styled(Image)({
  animationName: "fadein",
  animationDuration: "0.75s",
  animationFillMode: "both",
  "@keyframes fadein": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    },
  },
});

const Header = ({ heading, subheading, imageProps, direction = "ltr" }) => {
  return (
    <Box component="header">
      <Container
        maxWidth="lg"
        sx={{ mt: { xs: 4, sm: 8 }, mb: { xs: 8, sm: 16 } }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: { xs: 2, md: 4 },
          }}
        >
          <Box
            sx={[
              {
                gridRowStart: { md: "1" },
                gridColumn: { xs: "1 / span 12", md: "1 / span 6" },
                display: "flex",
                justifyContent: "center",
              },
              direction === "ltr" && { gridColumnStart: { md: 7 } },
            ]}
          >
            <Box sx={{ width: "100%", maxWidth: 800, display: "block" }}>
              <AnimatedImage
                priority
                sx={{ animationDelay: { md: "0.5s" } }}
                {...imageProps}
              />
            </Box>
          </Box>
          <Box
            sx={{
              gridRowStart: { md: "1" },
              gridColumn: { xs: "span 12", md: "span 6" },
              pt: { md: 8 },
            }}
          >
            <AnimatedTypography variant="h3" gutterBottom>
              {heading}
            </AnimatedTypography>
            {subheading && (
              <AnimatedTypography variant="h4" sx={{ animationDelay: "0.25s" }}>
                {subheading}
              </AnimatedTypography>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

Header.propTypes = {
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string,
  imageProps: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    layout: PropTypes.string,
    loader: PropTypes.func,
  }),
  direction: PropTypes.oneOf(["ltr", "rtl"]),
};

export default Header;
