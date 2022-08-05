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
          border: 1,
          borderColor: "primary.dark",
          borderRadius: 1,
          transitionProperty: "color, background-color, border-color",
          transitionDuration: "150ms",
          ...(!selected && {
            "&:hover, &.Mui-focusVisible": {
              color: "primary.contrastText",
              bgcolor: "primary.dark",
              "@media (hover: none)": {
                bgcolor: "transparent",
              },
            },
          }),
          ...(selected && {
            color: "primary.contrastText",
            bgcolor: "primary.main",
            // borderColor: "primary.dark"
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
