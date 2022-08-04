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
              ? theme.palette.primary[300]
              : theme.palette.primary[600],
          "&.hover": {
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
