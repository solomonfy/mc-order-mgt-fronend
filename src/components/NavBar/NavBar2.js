import React from "react";
import "./navbar2.css";
import { IconButton, Badge } from "@material-ui/core";
import { ShoppingCart, AccountCircle } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import mcLogo from "../../assets/mc_logo.png";

const NavBar2 = ({ cartItems }) => {
  const location = useLocation(); //Once we're on cart page, should not see that cart icon.

  let cartItemsCount = 0;
  if (cartItems.length > 0) cartItemsCount = cartItems.length;

  return (
    <nav className="nav">
      <Link to="/" className="nav-title">
        <img src={mcLogo} alt="logo" height="25px" /> Medochemie
      </Link>
      <ul>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/orders">Orders</Link>
        </li>
        <li>
          <Link to="/tasks">Tasks</Link>
        </li>

        <li>
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
        </li>
        {location.pathname !== "/cart" ? (
          <li>
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
          </li>
        ) : (
          <li></li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar2;
