import PropTypes from "prop-types";
import { Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const StepEventRoot = styled("div", {
  shouldForwardProp: (prop) => prop !== "position" && prop !== "sx",
})(({ position }) => ({
  display: "flex",
  ...(position === "horizontal" && {
    flexDirection: "column",
    flex: 1,
    "& > .MuiBox-root": {
      "& > .MuiTypography-root": {
        textAlign: "center",
      },
    },
  }),
  ...(position === "vertical" && {
    minHeight: 120,
    "& > .MuiBox-root": {
      flexDirection: "column",
      justifyContent: "center",
      margin: 0,
      "& > span:nth-of-type(odd)": {
        width: 2,
      },
      "& > .MuiTypography-root": {
        textAlign: "start",
      },
    },
  }),
}));

const StepEventConnector = styled("span")(({ theme }) => ({
  height: 2,
  flexGrow: 1,
  background: `linear-gradient(95deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 50%, ${theme.palette.primary.main} 100%)`,
}));

const StepEvent = ({ position, description, Icon, sx = [] }) => {
  return (
    <StepEventRoot
      position={position}
      sx={[...(Array.isArray(sx) ? sx : [sx])]}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <StepEventConnector />
        <Box
          component="span"
          sx={(theme) => ({
            width: 56,
            height: 56,
            display: "flex",
            p: 1,
            borderRadius: "50%",
            background: `linear-gradient(95deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 50%, ${theme.palette.primary.main} 100%)`,
          })}
        >
          <Icon sx={{ width: "100%", height: "100%" }} />
        </Box>
        <StepEventConnector />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", px: 2, mt: 1 }}>
        <Typography variant="body1">{description}</Typography>
      </Box>
    </StepEventRoot>
  );
};

StepEvent.propTypes = {
  position: PropTypes.oneOf(["horizontal", "vertical"]).isRequired,
  description: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default StepEvent;
