import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import createPalette from "./createPalette";
import createTypography from "./createTypography";
import createComponents from "./createComponents";
import shape from "./shape";
import zIndex from "./zIndex";

const theme = ({ mode: modeInput = "light" }) => {
  const palette = createPalette(modeInput);
  const typography = createTypography();

  const defaultSystemTheme = createTheme({
    palette: { ...palette },
    typography: { ...typography },
    shape: { ...shape },
    zIndex: { ...zIndex },
  });

  const components = createComponents(defaultSystemTheme);

  const systemTheme = responsiveFontSizes(
    createTheme({
      ...defaultSystemTheme,
      components: { ...components },
    })
  );

  return systemTheme;
};

export default theme;
