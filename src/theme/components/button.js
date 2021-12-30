const button = ({ shape }) => {
  return {
    styleOverrides: {
      root: {
        borderRadius: shape.button.borderRadius,
      },
      sizeSmall: {
        borderRadius: shape.button.borderRadiusSmall,
      },
      sizeLarge: {
        borderRadius: shape.button.borderRadiusLarge,
      },
    },
  };
};

export default button;
