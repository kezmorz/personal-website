import PropTypes from "prop-types";
import { Paper, Typography, Box } from "@mui/material";
import Image from "@/components/Image";

const HobbyCard = ({ heading, description, imageProps, sx = [] }) => {
  return (
    <Paper sx={[...(Array.isArray(sx) ? sx : [sx])]}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: 304, md: 368 },
        }}
      >
        <Image fill sx={{ objectFit: "cover" }} {...imageProps} />
      </Box>
      <Box sx={{ px: 2, pt: 4, pb: 2 }}>
        <Typography variant="h6" component="div" gutterBottom>
          {heading}
        </Typography>
        {description && (
          <Typography variant="body1" paragraph>
            {description}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

HobbyCard.propTypes = {
  heading: PropTypes.string.isRequired,
  description: PropTypes.string,
  imageProps: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    loader: PropTypes.func,
  }).isRequired,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default HobbyCard;
