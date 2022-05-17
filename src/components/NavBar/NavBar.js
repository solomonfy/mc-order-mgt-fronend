import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import logo from "../../assets/AmbaLogo.webp";
import useStyles from "./navbar-styles";

import { Link, useLocation } from "react-router-dom";

const NavBar = ({ cartItems }) => {
  const classes = useStyles();
  const location = useLocation(); //Once we're on cart page, should not see that cart icon.

  let cartItemsCount = 0;
  if (cartItems.length > 0) cartItemsCount = cartItems.length;

  return (
    <AppBar position="fixed" className={classes.appBar} color="inherit">
      <Toolbar>
        <Typography
          variant="h6"
          className={classes.title}
          color="inherit"
          component={Link}
          to="/"
        >
          <img src={logo} alt="logo" height="25px" className={classes.image} />
          Agent name goes here
        </Typography>
        <div className={classes.grow} />
        {location.pathname === "/" && (
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
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
