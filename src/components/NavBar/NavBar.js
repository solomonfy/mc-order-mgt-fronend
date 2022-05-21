import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  Box,
  Tabs,
  Tab,
} from "@material-ui/core";

import PropTypes from "prop-types";
import { ShoppingCart, AccountCircle } from "@material-ui/icons";
import logo from "../../assets/AmbaLogo.webp";
import useStyles from "./navbar-styles";

import { Link, useLocation } from "react-router-dom";

const NavBar = ({ cartItems }) => {
  const classes = useStyles();
  const location = useLocation(); //Once we're on cart page, should not see that cart icon.

  let cartItemsCount = 0;
  if (cartItems.length > 0) cartItemsCount = cartItems.length;

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 4 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const NavBarTabs = (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Home" {...a11yProps(0)} component={Link} to="/" />
          <Tab label="Orders" {...a11yProps(1)} component={Link} to="/orders" />
          <Tab
            label="Products"
            {...a11yProps(2)}
            component={Link}
            to="/products"
          />
          <Tab
            label="My Tasks"
            {...a11yProps(3)}
            component={Link}
            to="/tasks"
          />
        </Tabs>
      </Box>
    </>
  );

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="primary">
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
            color="inherit"
            component={Link}
            to="/"
          >
            <img
              src={logo}
              alt="logo"
              height="25px"
              className={classes.image}
            />
            Agent name goes here
          </Typography>
          {NavBarTabs}

          <div className={classes.grow} />

          <IconButton
            size="medium"
            edge="end"
            aria-label="account of current user"
            // aria-controls={menuId}
            aria-haspopup="true"
            // onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>

          {location.pathname !== "/cart" && (
            <div className={classes.button}>
              <IconButton
                aria-label="Show Cart Items"
                color="inherit"
                component={Link}
                to="/cart"
              >
                <Badge badgeContent={cartItemsCount} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
          )}
        </Toolbar>{" "}
      </AppBar>
    </>
  );
};

export default NavBar;
