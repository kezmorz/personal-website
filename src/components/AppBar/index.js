import { useState } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "use-intl";
import {
  AppBar as MuiAppBar,
  Toolbar,
  Drawer,
  Menu,
  MenuList,
  MenuItem,
  ListItemIcon,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
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
  const { mode, isDarkMode, setMode } = useThemeMode();

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
            {pages.map(({ name, link }) => (
              <Link
                key={name}
                href={link}
                underline="none"
                sx={[
                  {
                    mx: 1,
                    display: "block",
                    position: "relative",
                  },
                  (theme) => ({
                    "&::after": {
                      width: "100%",
                      content: "''",
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      height: "0.1em",
                      backgroundColor: theme.palette.primary.main,
                      transform: "scale(0)",
                      transformOrigin: "center",
                      transition: "opacity 300ms, transform 300ms",
                    },
                    "&:hover::after": { transform: "scale(1)" },
                    "&:focus::after": { transform: "scale(1)" },
                  }),
                ]}
              >
                {t(`navigation.pages.${name}`)}
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
                <MenuList>
                  {pages.map(({ name, link }) => (
                    <MenuItem
                      key={name}
                      component={Link}
                      href={link}
                      underline="none"
                      divider
                      onClick={toggleDrawer(false)}
                      sx={{ px: 0, py: 1 }}
                    >
                      {t(`navigation.pages.${name}`)}
                    </MenuItem>
                  ))}
                </MenuList>
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
                  value={mode}
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
