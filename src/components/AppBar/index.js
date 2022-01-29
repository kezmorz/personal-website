import { useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import {
  AppBar as MuiAppBar,
  Toolbar,
  Menu,
  MenuItem,
  ListItemIcon,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  LightModeOutlined as LightModeOutlinedIcon,
  DarkModeOutlined as DarkModeOutlinedIcon,
} from "@mui/icons-material";
import Flag from "react-world-flags";
import { LANGUAGE_OPTIONS } from "@/constants/languages";
import useThemeMode from "@/hooks/useThemeMode";
import Link from "@/components/Link";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const AppBar = () => {
  const [languageMenu, setLanguageMenu] = useState(null);
  const { pathname, query, locales, locale: activeLocale } = useRouter();
  const { isDarkMode, setMode } = useThemeMode();

  const handleChangeThemeMode = (newMode) => () => {
    if (newMode === null) {
      return;
    }
    setMode(newMode);
  };

  const handleLanguageMenuClick = (event) => {
    setLanguageMenu(event.currentTarget);
  };
  const handleLanguageMenuClose = () => {
    setLanguageMenu(null);
  };

  return (
    <>
      <MuiAppBar position="fixed">
        <Toolbar>
          <Link href="/" underline="none">
            Home
          </Link>
          <Box sx={{ flexGrow: 1 }}>
            <Link href="/resume" underline="none">
              Resume
            </Link>
            <Link href="/contact" underline="none">
              Contact
            </Link>
          </Box>
          <Tooltip title="Change language">
            <IconButton
              color="default"
              aria-label="change language"
              aria-owns={languageMenu ? "language-menu" : undefined}
              aria-haspopup="true"
              onClick={handleLanguageMenuClick}
            >
              <Flag
                code={LANGUAGE_OPTIONS[activeLocale].flag}
                height="24"
                width="24"
              />
            </IconButton>
          </Tooltip>
          <Menu
            id="language-menu"
            anchorEl={languageMenu}
            open={Boolean(languageMenu)}
            onClose={handleLanguageMenuClose}
            MenuListProps={{ "aria-labelledby": "language-menu" }}
          >
            {locales.map((locale) => (
              <MenuItem
                key={locale}
                component={Link}
                href={{ pathname, query }}
                underline="none"
                locale={locale}
                selected={activeLocale === locale}
                onClick={handleLanguageMenuClose}
              >
                <ListItemIcon>
                  <Flag
                    code={LANGUAGE_OPTIONS[locale].flag}
                    height="24"
                    width="24"
                  />
                </ListItemIcon>
                {LANGUAGE_OPTIONS[locale].label}
              </MenuItem>
            ))}
          </Menu>
          <Tooltip title="Toggle dark mode">
            <IconButton
              color="default"
              edge="end"
              aria-label="toggle dark mode"
              onClick={handleChangeThemeMode(isDarkMode ? "light" : "dark")}
            >
              {isDarkMode ? (
                <DarkModeOutlinedIcon />
              ) : (
                <LightModeOutlinedIcon />
              )}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </MuiAppBar>
      <Offset />
    </>
  );
};

AppBar.propTypes = {};

export default AppBar;
