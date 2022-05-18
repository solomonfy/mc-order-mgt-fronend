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

function ProductCard({ product, onAddToCart, cartItems }) {
  var randomImage = null;

  if (product.imageUrls) {
    randomImage =
      product.imageUrls[Math.floor(Math.random() * product.imageUrls.length)];
  }

  const isProductInCart = (productId) => {
    // console.log(productId);
    if (cartItems.length < 1) return;
    for (let i = 0; i < cartItems.length; i++) {
      let inCart = false;
      if (cartItems[i].id === productId) {
        return (inCart = true);
      }
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <Card className="card-root">
      <CardMedia
        className="card-media"
        image={randomImage}
        title={product.brandName}
      />
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
          {product.genericName} {capitalizeFirstLetter(product.formulation)}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className="card-actions">
        {/* {!isProductInCart(product.id) && ( )} */}
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
  );
}

export default ProductCard;
