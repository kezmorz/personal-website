import buttonBase from "./components/buttonBase";
import button from "./components/button";

const createComponents = () => {
  const buttonBaseComponent = buttonBase();
  const buttonComponent = button();

  return {
    MuiButtonBase: {
      ...buttonBaseComponent,
    },
    MuiButton: {
      ...buttonComponent,
    },
  };
};

export default createComponents;
