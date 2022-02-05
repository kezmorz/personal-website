import PropTypes from "prop-types";
import { Paper } from "@mui/material";

const SpotlightContainer = ({
  component = "div",
  maxWidth = "lg",
  disableGutters = false,
  sx = [],
  ...props
}) => {
  return (
    <Paper
      component={component}
      elevation={12}
      sx={[
        {
          width: "100%",
          mx: "auto",
          borderRadius: 4,
          display: "block",
          boxSizing: "border-box",
        },
        !disableGutters && {
          p: { xs: 2, sm: 3 },
        },
        maxWidth === "xs" && {
          maxWidth: {
            xs: (theme) => Math.max(theme.breakpoints.values.xs, 444),
          },
        },
        maxWidth !== "xs" &&
          ((theme) => ({
            [theme.breakpoints.up(maxWidth)]: {
              maxWidth: theme.breakpoints.values[maxWidth],
            },
          })),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    />
  );
};

SpotlightContainer.propTypes = {
  component: PropTypes.elementType,
  maxWidth: PropTypes.oneOfType([
    PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", false]),
    PropTypes.string,
  ]),
  disableGutters: PropTypes.bool,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
  children: PropTypes.node,
};

export default SpotlightContainer;
