const link = () => {
  return {
    defaultProps: {
      underline: "hover",
    },
    styleOverrides: {
      root: ({ ownerState, theme }) => ({
        ...(ownerState.color === "primary" && {
          color:
            theme.palette.mode === "dark"
              ? theme.palette.primary[400]
              : theme.palette.primary[800],
          "&:hover": {
            color:
              theme.palette.mode === "dark"
                ? theme.palette.primary[200]
                : theme.palette.primary[700],
          },
        }),
      }),
    },
  };
};

export default link;
