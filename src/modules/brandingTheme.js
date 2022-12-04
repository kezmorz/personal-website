import { Rubik } from "@next/font/google";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const primary = {
  50: "#DBF2FF",
  100: "#C3EAFE",
  200: "#96DCFD",
  300: "#6CC9F6",
  400: "#43B3EA",
  500: "#1E9BD7",
  600: "#197CBE",
  700: "#005AAA",
  800: "#16477F",
  900: "#15335E",
  950: "#0E223F",
};

const secondary = {
  50: "#FFF0F9",
  100: "#FBD5EC",
  200: "#F6BEE2",
  300: "#ED90CB",
  400: "#DE63B1",
  500: "#C83C96",
  600: "#B31B79",
  700: "#99075E",
  800: "#7C044A",
  900: "#5F0136",
  950: "#4C012B",
};

const grey = {
  50: "#FAFAFA",
  100: "#EFEFEF",
  200: "#DBDBDB",
  300: "#BEBEBE",
  400: "#AAAAAA",
  500: "#9B9B9B",
  600: "#767676",
  700: "#575757",
  800: "#424242",
  900: "#353535",
  950: "#1C1C1C",
};

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const getDesignTokens = (mode) => {
  return {
    palette: {
      mode: mode,
      primary: {
        ...primary,
        ...(mode === "light" && {
          light: primary[700],
          main: primary[800],
          dark: primary[900],
        }),
        ...(mode === "dark" && {
          light: primary[100],
          main: primary[300],
          dark: primary[500],
        }),
      },
      secondary: {
        ...secondary,
        ...(mode === "light" && {
          light: secondary[100],
          main: secondary[200],
          dark: secondary[400],
        }),
        ...(mode === "dark" && {
          light: secondary[400],
          main: secondary[500],
          dark: secondary[700],
        }),
      },
      grey: {
        ...grey,
      },
      text: {
        ...(mode === "light" && {
          primary: grey[900],
          secondary: grey[800],
        }),
        ...(mode === "dark" && {
          primary: grey[50],
          secondary: grey[100],
        }),
      },
      divider: mode === "dark" ? grey[700] : grey[200],
      scrollbar: mode === "dark" ? grey[800] : grey[100],
      background: {
        ...(mode === "light" && {
          paper: grey[50],
        }),
        ...(mode === "dark" && {
          default: grey[950],
          paper: grey[900],
        }),
      },
    },
    typography: {
      fontFamily: rubik.style.fontFamily,
      button: {
        textTransform: "none",
      },
    },
    shape: {
      borderRadius: 8,
      button: {
        borderRadius: 18,
        borderRadiusSmall: 15,
        borderRadiusLarge: 21,
      },
    },
    zIndex: {
      mobileStepper: 1000,
      fab: 1050,
      speedDial: 1050,
      appBar: 1100,
      drawer: 1200,
      modal: 1300,
      snackbar: 1400,
      tooltip: 1500,
    },
  };
};

const getThemedComponents = () => {
  return {
    components: {
      MuiCssBaseline: {
        defaultProps: {
          enableColorScheme: true,
        },
      },
      MuiPaper: {
        defaultProps: {
          variant: "outlined",
          elevation: 0,
        },
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
          outlined: {
            boxSizing: "border-box",
            overflow: "hidden",
          },
        },
      },
      MuiAppBar: {
        defaultProps: {
          variant: "elevation",
          elevation: 2,
          color: "default",
        },
        styleOverrides: {
          colorDefault: ({ theme }) => ({
            ...(!theme.vars && {
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.background.default,
            }),
          }),
        },
      },
      MuiButtonBase: {
        defaultProps: {
          disableTouchRipple: true,
        },
      },
      MuiButton: {
        styleOverrides: {
          root: ({ ownerState, theme }) => ({
            borderRadius: (theme.vars || theme).shape.button.borderRadius,
            "&:hover": {
              ...(ownerState.variant === "contained" && {
                color: theme.vars
                  ? // this is safe because grey does not change between default light/dark mode
                    theme.vars.palette.text.primary
                  : theme.palette.getContrastText?.(theme.palette.grey[300]),
              }),
              ...(ownerState.variant === "contained" &&
                ownerState.color !== "inherit" && {
                  color: (theme.vars || theme).palette[ownerState.color]
                    .contrastText,
                }),
            },
          }),
          sizeSmall: ({ theme }) => ({
            borderRadius: theme.shape.button.borderRadiusSmall,
          }),
          sizeLarge: ({ theme }) => ({
            borderRadius: theme.shape.button.borderRadiusLarge,
          }),
        },
      },
      MuiLink: {
        defaultProps: {
          underline: "hover",
        },
        styleOverrides: {
          root: ({ ownerState, theme }) => ({
            ...(ownerState.color === "primary" && {
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.primary[400]
                  : theme.palette.primary[800],
              "&:hover": {
                color:
                  theme.palette.mode === "dark"
                    ? theme.palette.primary[200]
                    : theme.palette.primary[700],
              },
            }),
          }),
        },
      },
      MuiDivider: {
        styleOverrides: {
          light: ({ theme }) => ({
            borderColor:
              theme.palette.mode === "dark"
                ? theme.palette.grey[800]
                : theme.palette.grey[100],
          }),
        },
      },
    },
  };
};

const brandingTheme = (mode) =>
  responsiveFontSizes(
    createTheme({
      ...getDesignTokens(mode),
      ...getThemedComponents(),
    })
  );

export default brandingTheme;
