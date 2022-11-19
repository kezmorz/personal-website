const paper = () => {
  return {
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
  };
};

export default paper;
