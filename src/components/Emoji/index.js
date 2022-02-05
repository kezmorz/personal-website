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

export default Emoji;
