import PropTypes from "prop-types";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import useThemeMode from "@/hooks/useThemeMode";

const Heading = styled(Typography)({
  margin: "16px 0 8px",
});

const SettingsDrawer = ({ open, onClose }) => {
  const { mode, setMode } = useThemeMode();

  const handleChangeThemeMode = (_, newMode) => {
    if (newMode === null) {
      return;
    }
    setMode(newMode);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: 360 } }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        <Typography variant="h6">Settings</Typography>
        <Tooltip title="Close settings drawer">
          <IconButton
            color="default"
            edge="end"
            aria-label="close settings drawer"
            onClick={onClose}
          >
            <CloseOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Divider />
      <Box sx={{ px: 2 }}>
        <Heading id="settings-mode" gutterBottom>
          Mode
        </Heading>
        <ToggleButtonGroup
          value={mode}
          exclusive
          fullWidth
          color="primary"
          aria-labelledby="settings-mode"
          onChange={handleChangeThemeMode}
        >
          <ToggleButton value="light" aria-label="set theme mode light">
            Light
          </ToggleButton>
          <ToggleButton value="system" aria-label="set theme mode system">
            System
          </ToggleButton>
          <ToggleButton value="dark" aria-label="set theme mode dark">
            Dark
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Drawer>
  );
};

SettingsDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SettingsDrawer;
