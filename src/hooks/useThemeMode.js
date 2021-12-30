import useMediaQuery from "@mui/material/useMediaQuery";
import { useMemo } from "react";
import useLocalStorage from "./useLocalStorage";

const useThemeMode = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [darkMode, setDarkMode, removeDarKMode] = useLocalStorage("dark-mode");

  const mode =
    typeof darkMode !== "undefined" ? (darkMode ? "dark" : "light") : "system";
  const isDarkMode =
    typeof darkMode !== "undefined" ? darkMode : prefersDarkMode;

  const setMode = useMemo(() => {
    return (newMode) => {
      if (newMode === "system") {
        removeDarKMode();
        return;
      }
      setDarkMode(newMode === "dark" ? true : false);
    };
  }, [removeDarKMode, setDarkMode]);

  return {
    mode: mode,
    setMode: setMode,
    isDarkMode: isDarkMode,
  };
};

export default useThemeMode;
