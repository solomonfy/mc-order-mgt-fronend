import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import "./ProductCard.css";
import { Link } from "react-router-dom";

function ProductCard({ product, onAddToCart, cartItems }) {
  var randomImage = null;

  if (product.imageUrls) {
    randomImage =
      product.imageUrls[Math.floor(Math.random() * product.imageUrls.length)];
  }

  const isProductInCart = (productId) => {
    if (cartItems.length < 1) return;
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].id === productId) {
        return true;
      }
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <>
      <Card className="card-root">
        <Link to={`/product-detail/${product.id}`}>
          <CardMedia
            className="card-media"
            image={randomImage}
            title={product.brandName}
          />
        </Link>
        <CardContent>
          <div className="card-content">
            <Typography variant="h5" gutterBottom>
              {product.brandName.toUpperCase()} {}
              <Typography variant="overline">{product.strength}</Typography>
            </Typography>
            <Typography variant="subtitle1">${product.unitPrice}</Typography>
          </div>
          <Typography variant="body2" color="textSecondary">
            {" "}
            {product.genericName} {capitalizeFirstLetter(product.formulation)} (
            {product.packSize})
          </Typography>
        </CardContent>
        <CardActions disableSpacing className="card-actions">
          <IconButton
            arial-label="Add to Cart"
            onClick={() => onAddToCart(product, 100)}
            disabled={isProductInCart(product.id)}
            color="primary"
          >
            <AddShoppingCart />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
}

export default ProductCard;
