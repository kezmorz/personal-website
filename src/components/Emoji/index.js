import PropTypes from "prop-types";
import { Box } from "@mui/material";

const Emoji = ({ symbol, label, ...props }) => {
  return (
    <Box
      component="span"
      role="img"
      aria-label={label ? label : ""}
      aria-hidden={label ? "false" : "true"}
      {...props}
    >
      {symbol}
    </Box>
  );
};

Emoji.propTypes = {
  symbol: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default Emoji;
