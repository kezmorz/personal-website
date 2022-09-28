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

const light = {
  mode: "light",
  primary: {
    light: primary[700],
    main: primary[800],
    dark: primary[900],
    ...primary,
  },
  secondary: {
    light: secondary[100],
    main: secondary[200],
    dark: secondary[400],
    ...secondary,
  },
  grey: {
    ...grey,
  },
  text: {
    primary: grey[900],
    secondary: grey[800],
  },
  divider: grey[200],
  background: {
    paper: grey[50],
  },
};

export default light;
