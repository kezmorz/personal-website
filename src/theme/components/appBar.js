const appBar = () => {
  return {
    defaultProps: {
      variant: "elevation",
      elevation: 2,
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
