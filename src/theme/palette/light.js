const primary = {
  50: "#D6FFF5",
  100: "#BFF7EA",
  200: "#9DEDDA",
  300: "#77DCCC",
  400: "#52C4BA",
  500: "#32A4A0",
  600: "#21808B",
  700: "#14586B",
  800: "#104B65",
  900: "#0D3D59",
  950: "#092B3E",
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
    light: primary[400],
    main: primary[600],
    dark: primary[800],
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
