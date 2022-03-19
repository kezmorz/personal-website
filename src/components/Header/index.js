import PropTypes from "prop-types";
import Image from "next/image";
import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const AnimatedTypography = styled(Typography)({
  animationName: "rotatein",
  animationDuration: "1s",
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

const Header = ({
  heading,
  subheading,
  image,
  imageProps,
  direction = "ltr",
}) => {
  return (
    <Box component="header">
      <Container
        maxWidth="lg"
        sx={{ mt: { xs: 2, sm: 4 }, mb: { xs: 8, sm: 16 } }}
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
              },
              direction === "ltr" && { gridColumnStart: { md: 7 } },
            ]}
          >
            {/* <Image  /> */}
          </Box>
          <Box
            sx={{
              gridRowStart: { md: "1" },
              gridColumn: { xs: "span 12", md: "span 6" },
            }}
          >
            <AnimatedTypography variant="h3" gutterBottom>
              {heading}
            </AnimatedTypography>
            {subheading && (
              <AnimatedTypography variant="h4" sx={{ animationDelay: "0.5s" }}>
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
  image: PropTypes.string.isRequired,
  imageProps: PropTypes.object,
  direction: PropTypes.oneOf(["ltr", "rtl"]).isRequired,
};

export default Header;
