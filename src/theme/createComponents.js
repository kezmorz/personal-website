import button from "./components/button";

const createComponents = (theme) => {
  const buttonComponent = button(theme);

  return {
    MuiButton: {
      ...buttonComponent,
    },
  };
};

export default createComponents;
