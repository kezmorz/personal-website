import { useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Flag from "react-world-flags";
import Link from "@/components/Link";
import { LANGUAGE_OPTIONS } from "src/constants/languages";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const AppBar = ({ onSettingsClick }) => {
  const [languageMenu, setLanguageMenu] = useState(null);
  const {
    pathname,
    query,
    asPath,
    locales,
    locale: activeLocale,
  } = useRouter();

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
          <Box sx={{ flexGrow: 1 }} />
          {/* <Link href="/contact" underline="none">
            Contact
          </Link>
          <Link href="/login" underline="none" sx={{ ml: 2 }}>
            Login
          </Link>
          <Button
            component={Link}
            variant="contained"
            href="/signup"
            sx={{ ml: 2 }}
          >
            Sign Up
          </Button> */}
          <Tooltip title="Change language">
            <IconButton
              color="primary"
              aria-label="change language"
              aria-owns={languageMenu ? "language-menu" : undefined}
              aria-haspopup="true"
              onClick={handleLanguageMenuClick}
              sx={{ ml: 1 }}
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
              <Link
                key={locale}
                href={{ pathname, query }}
                as={asPath}
                underline="none"
                locale={locale}
              >
                <MenuItem
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
              </Link>
            ))}
          </Menu>
          <Tooltip title="Open settings drawer">
            <IconButton
              color="primary"
              edge="end"
              aria-label="open settings drawer"
              onClick={onSettingsClick}
            >
              <SettingsOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </MuiAppBar>
      <Offset />
    </>
  );
};

AppBar.propTypes = {
  onSettingsClick: PropTypes.func.isRequired,
};

export default AppBar;
