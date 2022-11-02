import PropTypes from "prop-types";
import { Paper, Divider, Typography, Box } from "@mui/material";

const SkillCard = ({ heading, description, children, sx = [] }) => {
  return (
    <Paper sx={[{ p: 2 }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <Typography variant="h6" component="div" gutterBottom>
        {heading}
      </Typography>
      {description && (
        <Typography variant="body1" paragraph>
          {description}
        </Typography>
      )}
      <Divider />
      <Box sx={{ display: "flex", flexDirection: "column", pt: 4 }}>
        {children}
      </Box>
    </Paper>
  );
};

SkillCard.propTypes = {
  heading: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default SkillCard;
