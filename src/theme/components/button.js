import { buttonClasses } from "@mui/material/Button";
import { alpha } from "@mui/material/styles";

const button = () => {
  return {
    // defaultProps: {
    //   color: "primary",
    // },
    styleOverrides: {
      root: ({ ownerState, theme }) => ({
        ...theme.typography.button,
        minWidth: 64,
        padding: "6px 16px",
        borderRadius: (theme.vars || theme).shape.button.borderRadius,
        transition: theme.transitions.create(
          ["background-color", "box-shadow", "border-color", "color"],
          {
            duration: theme.transitions.duration.short,
          }
        ),
        "&:hover": {
          textDecoration: "none",
          backgroundColor: theme.vars
            ? `rgba(${theme.vars.palette.text.primaryChannel} / ${theme.vars.palette.action.hoverOpacity})`
            : alpha(
                theme.palette.text.primary,
                theme.palette.action.hoverOpacity
              ),
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            backgroundColor: "transparent",
          },
          ...(ownerState.variant === "text" &&
            ownerState.color !== "inherit" && {
              backgroundColor: theme.vars
                ? `rgba(${theme.vars.palette[ownerState.color].mainChannel} / ${
                    theme.vars.palette.action.hoverOpacity
                  })`
                : alpha(
                    theme.palette[ownerState.color].main,
                    theme.palette.action.hoverOpacity
                  ),
              // Reset on touch devices, it doesn't add specificity
              "@media (hover: none)": {
                backgroundColor: "transparent",
              },
            }),
          ...(ownerState.variant === "outlined" &&
            ownerState.color !== "inherit" && {
              border: `1px solid ${
                (theme.vars || theme).palette[ownerState.color].main
              }`,
              backgroundColor: theme.vars
                ? `rgba(${theme.vars.palette[ownerState.color].mainChannel} / ${
                    theme.vars.palette.action.hoverOpacity
                  })`
                : alpha(
                    theme.palette[ownerState.color].main,
                    theme.palette.action.hoverOpacity
                  ),
              // Reset on touch devices, it doesn't add specificity
              "@media (hover: none)": {
                backgroundColor: "transparent",
              },
            }),
          ...(ownerState.variant === "contained" && {
            backgroundColor: (theme.vars || theme).palette.grey.A100,
            boxShadow: (theme.vars || theme).shadows[4],
            // Reset on touch devices, it doesn't add specificity
            "@media (hover: none)": {
              boxShadow: (theme.vars || theme).shadows[2],
              backgroundColor: (theme.vars || theme).palette.grey[300],
            },
          }),
          ...(ownerState.variant === "contained" &&
            ownerState.color !== "inherit" && {
              backgroundColor: (theme.vars || theme).palette[ownerState.color]
                .dark,
              // Reset on touch devices, it doesn't add specificity
              "@media (hover: none)": {
                backgroundColor: (theme.vars || theme).palette[ownerState.color]
                  .main,
              },
            }),
        },
        "&:active": {
          ...(ownerState.variant === "contained" && {
            boxShadow: (theme.vars || theme).shadows[8],
          }),
        },
        [`&.${buttonClasses.focusVisible}`]: {
          ...(ownerState.variant === "contained" && {
            boxShadow: (theme.vars || theme).shadows[6],
          }),
        },
        [`&.${buttonClasses.disabled}`]: {
          color: (theme.vars || theme).palette.action.disabled,
          ...(ownerState.variant === "outlined" && {
            border: `1px solid ${
              (theme.vars || theme).palette.action.disabledBackground
            }`,
          }),
          ...(ownerState.variant === "outlined" &&
            ownerState.color === "secondary" && {
              border: `1px solid ${
                (theme.vars || theme).palette.action.disabled
              }`,
            }),
          ...(ownerState.variant === "contained" && {
            color: (theme.vars || theme).palette.action.disabled,
            boxShadow: (theme.vars || theme).shadows[0],
            backgroundColor: (theme.vars || theme).palette.action
              .disabledBackground,
          }),
        },
        ...(ownerState.variant === "text" && {
          padding: "6px 8px",
        }),
        ...(ownerState.variant === "text" &&
          ownerState.color !== "inherit" && {
            color: (theme.vars || theme).palette[ownerState.color].main,
          }),
        ...(ownerState.variant === "outlined" && {
          padding: "5px 15px",
          border: "1px solid currentColor",
        }),
        ...(ownerState.variant === "outlined" &&
          ownerState.color !== "inherit" && {
            color: (theme.vars || theme).palette[ownerState.color].main,
            border: theme.vars
              ? `1px solid rgba(${
                  theme.vars.palette[ownerState.color].mainChannel
                } / 0.5)`
              : `1px solid ${alpha(theme.palette[ownerState.color].main, 0.5)}`,
          }),
        ...(ownerState.variant === "contained" && {
          color: theme.vars
            ? // this is safe because grey does not change between default light/dark mode
              theme.vars.palette.text.primary
            : theme.palette.getContrastText?.(theme.palette.grey[300]),
          backgroundColor: (theme.vars || theme).palette.grey[300],
          boxShadow: (theme.vars || theme).shadows[2],
        }),
        ...(ownerState.variant === "contained" &&
          ownerState.color !== "inherit" && {
            color: (theme.vars || theme).palette[ownerState.color].contrastText,
            backgroundColor: (theme.vars || theme).palette[ownerState.color]
              .main,
          }),
        ...(ownerState.color === "inherit" && {
          color: "inherit",
          borderColor: "currentColor",
        }),
        ...(ownerState.size === "small" &&
          ownerState.variant === "text" && {
            padding: "4px 5px",
            fontSize: theme.typography.pxToRem(13),
          }),
        ...(ownerState.size === "large" &&
          ownerState.variant === "text" && {
            padding: "8px 11px",
            fontSize: theme.typography.pxToRem(15),
          }),
        ...(ownerState.size === "small" &&
          ownerState.variant === "outlined" && {
            padding: "3px 9px",
            fontSize: theme.typography.pxToRem(13),
          }),
        ...(ownerState.size === "large" &&
          ownerState.variant === "outlined" && {
            padding: "7px 21px",
            fontSize: theme.typography.pxToRem(15),
          }),
        ...(ownerState.size === "small" &&
          ownerState.variant === "contained" && {
            padding: "4px 10px",
            fontSize: theme.typography.pxToRem(13),
          }),
        ...(ownerState.size === "large" &&
          ownerState.variant === "contained" && {
            padding: "8px 22px",
            fontSize: theme.typography.pxToRem(15),
          }),
        ...(ownerState.fullWidth && {
          width: "100%",
        }),
      }),
      disableElevation: {
        boxShadow: "none",
        "&:hover, &:active": {
          boxShadow: "none",
        },
        [`&.${buttonClasses.focusVisible}`]: {
          boxShadow: "none",
        },
        [`&.${buttonClasses.disabled}`]: {
          boxShadow: "none",
        },
      },
      sizeSmall: ({ theme }) => ({
        borderRadius: theme.shape.button.borderRadiusSmall,
      }),
      sizeLarge: ({ theme }) => ({
        borderRadius: theme.shape.button.borderRadiusLarge,
      }),
    },
  };
};

export default button;
