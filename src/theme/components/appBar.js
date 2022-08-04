const appBar = () => {
  return {
    defaultProps: {
      color: "default",
    },
    styleOverrides: {
      colorDefault: ({ theme }) => ({
        ...(!theme.vars && {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.background.default,
        }),
      }),
    },
  };
};

export default appBar;
