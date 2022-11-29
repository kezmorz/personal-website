import PropTypes from "prop-types";
import { Paper, Typography, Box } from "@mui/material";
import Image from "@/components/Image";

const TestimonialCard = ({ quote, profile, sx = [] }) => {
  const { name, title, company, imageProps } = profile;

  return (
    <Paper sx={[{ p: 2 }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <Typography variant="body1">{quote}</Typography>
      <Box sx={{ display: "flex", mt: { xs: 2, md: 4 } }}>
        <Box
          sx={{
            position: "relative",
            width: 56,
            height: 56,
            flexShrink: 0,
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          <Image
            fill
            sizes="56px"
            sx={{ objectFit: "cover" }}
            {...imageProps}
          />
        </Box>
        <Box sx={{ ml: 2 }}>
          <Typography variant="body1">
            {name}
            {title ? `, ${title}` : null}
          </Typography>
          <Typography variant="body1">{company}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

TestimonialCard.propTypes = {
  quote: PropTypes.string.isRequired,
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    company: PropTypes.string,
    imageProps: PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      loader: PropTypes.func,
    }).isRequired,
  }).isRequired,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default TestimonialCard;
