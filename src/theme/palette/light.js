const primary = {
  50: "#D6FFF5",
  100: "#BFF7EA",
  200: "#9DEDDA",
  300: "#77DCCC",
  400: "#52C4BA",
  500: "#32A4A0",
  main: "#21808B",
  600: "#14586B",
  700: "#104B65",
  800: "#0D3D59",
  900: "#092B3E",
};

const secondary = {
  50: "#FFF0F9",
  100: "#FBD5EC",
  200: "#F6BEE2",
  300: "#ED90CB",
  400: "#DE63B1",
  main: "#C83C96",
  500: "#B31B79",
  600: "#99075E",
  700: "#7C044A",
  800: "#5F0136",
  900: "#4C012B",
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
    ...primary,
  },
  secondary: {
    ...secondary,
  },
  grey: {
    ...grey,
  },
  text: {
    primary: grey[900],
    secondary: grey[800],
  },
  divider: grey[100],
};

export default light;
