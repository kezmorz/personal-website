import PropTypes from "prop-types";
import { ButtonBase } from "@mui/material";

const Highlighter = ({
  selected = false,
  onClick,
  onFocusVisible,
  sx = [],
  ...props
}) => {
  return (
    <ButtonBase
      onClick={(event) => {
        if (onClick) {
          onClick(event);
        }
      }}
      onFocusVisible={(event) => {
        if (onFocusVisible) {
          onFocusVisible(event);
        }
      }}
      sx={[
        {
          justifyContent: "flex-start",
          alignItems: "center",
          textAlign: "left",
          color: "inhert",
          border: 1,
          borderColor: (theme) =>
            theme.palette.mode === "dark" ? "primary.900" : "primary.100",
          borderRadius: 1,
          transitionProperty: "color, background-color, border-color",
          transitionDuration: "150ms",
          ...(!selected && {
            "&:hover, &.Mui-focusVisible": {
              bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "primary.950" : "primary.50",
              "@media (hover: none)": {
                bgcolor: "transparent",
              },
            },
          }),
          ...(selected && {
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "primary.800" : "primary.200",
          }),
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    />
  );
};

Highlighter.propTypes = {
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  onFocusVisible: PropTypes.func,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default Highlighter;
