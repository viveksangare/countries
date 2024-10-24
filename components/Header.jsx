import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { DataContext } from "../contexts/DataContext";
import { useContext } from "react";

const drawerWidth = 200;

const navItems = [
  { page: "Home", href: "/", target: "_self" },
  { page: "API Docs", href: "https://restcountries.com/", target: "_blank" },
];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "200px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "250px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { searchedCountry, setSearchedCountry } = useContext(DataContext);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const searchHandler = (e) => {
    setSearchedCountry(e.target.value);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        component="div"
        sx={{
          flexGrow: 1,
          display: { xs: "block", sm: "none" },
          backgroundColor: "#000080",
        }}
      >
        <Link to="/" style={{ display: "inline-block", width: "60px" }}>
          <IconButton color="inherit">
            <img src={logo} alt="Logo" style={{ width: "100%" }} />
          </IconButton>
        </Link>
      </Typography>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton sx={{ justifyContent: "center" }}>
              <Link
                to={item.href}
                style={{ textDecoration: "none", color: "inherit" }}
                target={item.target}
              >
                {item.page}
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar
          sx={{ justifyContent: "space-between", backgroundColor: "#000080" }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Link to="/" style={{ display: "inline-block", width: "60px" }}>
              <IconButton color="inherit">
                <img src={logo} alt="Logo" style={{ width: "100%" }} />
              </IconButton>
            </Link>
          </Typography>
          <Search sx={{ margin: "8px" }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Country"
              inputProps={{ "aria-label": "search" }}
              onChange={searchHandler}
            />
          </Search>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item, index) => (
              <Button key={index} sx={{ color: "#fff" }}>
                <Link
                  to={item.href}
                  style={{ textDecoration: "none", color: "inherit" }}
                  target={item.target}
                >
                  {item.page}
                </Link>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

export default DrawerAppBar;
