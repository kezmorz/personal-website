const divider = () => {
  return {
    styleOverrides: {
      light: ({ theme }) => ({
        borderColor:
          theme.palette.mode === "dark"
            ? theme.palette.grey[800]
            : theme.palette.grey[100],
      }),
    },
  };
};

export default divider;
