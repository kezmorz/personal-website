import PropTypes from "prop-types";
import { Paper, Typography, Box } from "@mui/material";

const CharacteristicCard = ({ heading, description, Icon, sx = [] }) => {
  return (
    <Paper sx={[{ p: 2 }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <Box component="span" sx={{ width: 64, height: 64, display: "flex" }}>
        <Icon sx={{ width: "100%", height: "100%" }} />
      </Box>
      <Box sx={{ mt: 1 }}>
        <Typography variant="h5" component="div" gutterBottom>
          {heading}
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          {description}
        </Typography>
      </Box>
    </Paper>
  );
};

CharacteristicCard.propTypes = {
  heading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default CharacteristicCard;
