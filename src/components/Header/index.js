import PropTypes from "prop-types";
import Image from "next/image";
import { Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";

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
    rotateX: 90,
  },
  visible: {
    rotateX: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const AnimatedDiv = styled(motion.div)({});

const Header = ({ heading, subheading, imageProps, direction = "ltr" }) => {
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
            sx={[
              {
                gridRowStart: { md: 1 },
                gridColumn: { xs: "1 / span 12", md: "1 / span 6" },
                display: "flex",
                justifyContent: "center",
              },
              direction === "ltr" && { gridColumnStart: { md: 7 } },
            ]}
          >
            <AnimatedDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.75 }}
              sx={{ width: "100%", maxWidth: 800, display: "block" }}
            >
              <Image priority {...imageProps} />
            </AnimatedDiv>
          </Box>
          <AnimatedDiv
            variants={containerVariants}
            initial="initial"
            animate="visible"
            sx={{
              gridRowStart: { md: "1" },
              gridColumn: { xs: "span 12", md: "span 6" },
              pt: { md: 8 },
            }}
          >
            <AnimatedDiv variants={textVariants}>
              <Typography variant="h3" gutterBottom>
                {heading}
              </Typography>
            </AnimatedDiv>
            {subheading && (
              <AnimatedDiv variants={textVariants}>
                <Typography variant="h4" gutterBottom>
                  {subheading}
                </Typography>
              </AnimatedDiv>
            )}
          </AnimatedDiv>
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
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    sizes: PropTypes.string,
    layout: PropTypes.string,
    loader: PropTypes.func,
  }),
  direction: PropTypes.oneOf(["ltr", "rtl"]),
};

export default Header;
