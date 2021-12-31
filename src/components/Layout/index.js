import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import AppBar from "@/components/AppBar";
import SettingsDrawer from "@/components/SettingsDrawer";

const Layout = ({ children }) => {
  const [settingsDrawerOpen, setSettingsDrawerOpen] = useState(false);

  const handleSettingsDrawerOpen = () => {
    setSettingsDrawerOpen(true);
  };
  const handleSettingsDrawerClose = useCallback(() => {
    setSettingsDrawerOpen(false);
  }, []);

  return (
    <>
      <AppBar onSettingsClick={handleSettingsDrawerOpen} />
      {children}
      <SettingsDrawer
        open={settingsDrawerOpen}
        onClose={handleSettingsDrawerClose}
      />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Layout;
