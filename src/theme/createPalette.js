import light from "./palette/light";
import dark from "./palette/dark";

const createPalette = (mode) => {
  const modes = { light, dark };

  return {
    ...modes[mode],
  };
};

export default createPalette;
