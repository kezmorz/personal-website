import { useState } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "use-intl";
import {
  AppBar as MuiAppBar,
  Toolbar,
  Drawer,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
  Tooltip,
  Divider,
  Typography,
  Box,
  ListItemText,
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
import FancyLink from "@/components/FancyLink";
import Link from "@/components/Link";

const pages = [
  { name: "home", link: "/" },
  { name: "about", link: "/about" },
  { name: "resume", link: "/resume" },
  { name: "snippets", link: "/snippets" },
  { name: "contact", link: "/contact" },
];

const Heading = styled(Typography)({
  margin: "16px 0 8px",
});

const SubHeading = styled(Typography)({
  margin: "8px 0 4px",
});

const IconToggleButton = styled(ToggleButton)({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  textTransform: "none",
  "& > *": {
    marginRight: "8px",
  },
});

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const AppBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [languageMenu, setLanguageMenu] = useState(null);
  const { pathname, query, locales, locale: activeLocale } = useRouter();
  const t = useTranslations("appbar");
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

  const handleLanguageMenuClick = (event) => {
    setLanguageMenu(event.currentTarget);
  };
  const handleLanguageMenuClose = () => {
    setLanguageMenu(null);
  };

  const handleChangeThemeMode = (event) => {
    if (event.currentTarget.value === null) {
      return;
    }
    setMode(event.currentTarget.value);
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
            <List disablePadding role="menubar" sx={{ display: "flex" }}>
              {pages.map(({ name, link }) => (
                <ListItem key={name} disablePadding role="none">
                  <ListItemButton
                    component={FancyLink}
                    href={link}
                    disableRipple
                    disableTouchRipple
                    role="menuitem"
                    sx={{
                      p: 0,
                      mx: 2,
                      "&.Mui-focusVisible": {
                        bgcolor: "unset",
                      },
                      "&:hover": {
                        bgcolor: "unset",
                      },
                    }}
                  >
                    <ListItemText primary={t(`navigation.pages.${name}`)} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
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
              disablePortal
              anchorEl={languageMenu}
              open={Boolean(languageMenu)}
              role="menu"
              MenuListProps={{ "aria-labelledby": "language-menu" }}
              onClose={handleLanguageMenuClose}
            >
              {locales.map((locale) => (
                <MenuItem
                  key={locale}
                  component={Link}
                  href={{ pathname, query }}
                  underline="none"
                  locale={locale}
                  selected={activeLocale === locale}
                  role="menuitem"
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
                value={isDarkMode ? "light" : "dark"}
                aria-label="toggle dark mode"
                onClick={handleChangeThemeMode}
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
            <Tooltip title="Open drawer">
              <IconButton
                color="default"
                edge="end"
                aria-label="open drawer"
                onClick={toggleDrawer(true)}
              >
                <MenuOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Drawer
              anchor="top"
              disablePortal
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
                <Heading variant="h4" gutterBottom>
                  {t("navigation.heading")}
                </Heading>
                <List>
                  {pages.map(({ name, link }) => (
                    <ListItem key={name} disablePadding divider>
                      <ListItemButton
                        component={Link}
                        href={link}
                        underline="none"
                        onClick={toggleDrawer(false)}
                        sx={{ px: 0, py: 1 }}
                      >
                        <ListItemText primary={t(`navigation.pages.${name}`)} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
                <Heading variant="h4" gutterBottom>
                  {t("settings.heading")}
                </Heading>
                <SubHeading variant="h6" gutterBottom>
                  {t("settings.language")}
                </SubHeading>
                <TextField
                  id="appbar-drawer-language-select"
                  select
                  fullWidth
                  hiddenLabel
                  value={activeLocale}
                  role="listbox"
                  inputProps={{ sx: { display: "flex", alignItems: "center" } }}
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
                      role="option"
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
                </TextField>
                <SubHeading
                  id="appbar-drawer-subheading-theme"
                  variant="h6"
                  gutterBottom
                >
                  {t("settings.theme.heading")}
                </SubHeading>
                <ToggleButtonGroup
                  value={isDarkMode ? "dark" : "light"}
                  exclusive
                  fullWidth
                  color="primary"
                  aria-labelledby="appbar-drawer-subheading-theme"
                  onChange={handleChangeThemeMode}
                >
                  <IconToggleButton
                    value="light"
                    aria-label="set theme mode light"
                  >
                    <LightModeOutlinedIcon fontSize="small" />
                    {t("settings.theme.light")}
                  </IconToggleButton>
                  <IconToggleButton
                    value="dark"
                    aria-label="set theme mode dark"
                  >
                    <DarkModeOutlinedIcon fontSize="small" />
                    {t("settings.theme.dark")}
                  </IconToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </MuiAppBar>
      <Offset />
    </>
  );
};

AppBar.messages = ["appbar"];

AppBar.propTypes = {};

export default AppBar;
