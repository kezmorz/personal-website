import { useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import {
  AppBar as MuiAppBar,
  Toolbar,
  Drawer,
  Menu,
  MenuList,
  MenuItem,
  ListItemIcon,
  FormControl,
  Select,
  IconButton,
  Tooltip,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  LightModeOutlined as LightModeOutlinedIcon,
  DarkModeOutlined as DarkModeOutlinedIcon,
  MenuOutlined as MenuOutlinedIcon,
  CloseOutlined as CloseOutlinedIcon,
} from "@mui/icons-material";
import Flag from "react-world-flags";
import { LANGUAGE_OPTIONS } from "@/constants/languages";
import useThemeMode from "@/hooks/useThemeMode";
import Link from "@/components/Link";

const pages = [
  { name: "home", link: "/" },
  { name: "about", link: "/about" },
  { name: "snippets", link: "/snippets" },
  { name: "resume", link: "/resume" },
  { name: "contact", link: "/contact" },
];

const DrawerHeading = styled(Typography)({
  margin: "16px 0 8px",
});

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const AppBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [languageMenu, setLanguageMenu] = useState(null);
  const { pathname, query, locales, locale: activeLocale } = useRouter();
  const { isDarkMode, setMode } = useThemeMode();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerOpen(open);
  };

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
          <Box sx={{ flex: "1 1", display: "flex" }}>
            <Link href="/" underline="none">
              Home
            </Link>
          </Box>
          <Box
            sx={{
              flex: "1 1",
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {pages.map(({ name, link }) => (
              <Link key={name} href={link} underline="none" sx={{ my: 2 }}>
                {name}
              </Link>
            ))}
          </Box>
          <Box
            sx={{
              flex: "1 1",
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
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
          </Box>
          <Box
            sx={{
              flex: "1 1",
              display: { xs: "flex", md: "none" },
              justifyContent: "flex-end",
            }}
          >
            <Tooltip title="Toggle drawer">
              <IconButton
                color="default"
                edge="end"
                aria-label="toggle drawer"
                onClick={toggleDrawer(true)}
              >
                <MenuOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Drawer
              anchor="top"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
              PaperProps={{ sx: { width: "auto", height: "100%" } }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  p: 2,
                }}
              >
                <Tooltip title="Close drawer">
                  <IconButton
                    color="default"
                    edge="end"
                    aria-label="close drawer"
                    onClick={toggleDrawer(false)}
                  >
                    <CloseOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Divider />
              <Box sx={{ px: 2 }}>
                <DrawerHeading variant="h4" gutterBottom>
                  Navigation
                </DrawerHeading>
                <MenuList>
                  {pages.map(({ name, link }) => (
                    <MenuItem
                      key={name}
                      component={Link}
                      href={link}
                      underline="none"
                      divider
                      sx={{ px: 0, py: 1 }}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </MenuList>
                <DrawerHeading variant="h4" gutterBottom>
                  Settings
                </DrawerHeading>
                <FormControl sx={{ width: "100%", py: 1 }}>
                  <Select
                    value={activeLocale}
                    inputProps={{
                      "aria-label": "Language",
                      sx: { display: "flex", alignItems: "center" },
                    }}
                  >
                    {locales.map((locale) => (
                      <MenuItem
                        key={locale}
                        component={Link}
                        href={{ pathname, query }}
                        underline="none"
                        locale={locale}
                        value={locale}
                        selected={activeLocale === locale}
                      >
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <Flag
                            code={LANGUAGE_OPTIONS[locale].flag}
                            height="24"
                            width="24"
                          />
                        </ListItemIcon>
                        {LANGUAGE_OPTIONS[locale].label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </MuiAppBar>
      <Offset />
    </>
  );
};

AppBar.propTypes = {};

export default AppBar;
