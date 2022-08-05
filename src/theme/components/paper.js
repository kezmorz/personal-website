const paper = () => {
  return {
    defaultProps: {
      variant: "outlined",
    },
    styleOverrides: {
      root: {
        backgroundImage: "none",
      },
      outlined: {
        boxSizing: "border-box",
      },
    },
  };
};

export default paper;
