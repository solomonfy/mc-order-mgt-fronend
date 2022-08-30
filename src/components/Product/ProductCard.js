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

import CartContext from "../../CartContext";
import { useContext } from "react";
import formatter from "../../util/formatter";

function ProductCard({ product }) {
  const { cartProducts, addToCart } = useContext(CartContext);

  var randomImage = null;

  if (product.imageUrls) {
    randomImage =
      product.imageUrls[Math.floor(Math.random() * product.imageUrls.length)];
  }

  const isProductInCart = (id) => {
    if (cartProducts.length < 1) return;
    // const exist= cartProducts.find(x => x.id === id)

    for (let i = 0; i < cartProducts.length; i++) {
      if (cartProducts[i].id === id) {
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
            src={randomImage}
            title={product.brandName}
          />
        </Link>
        <CardContent>
          <div className="card-content">
            <Typography variant="h5" gutterBottom>
              {product.brandName.toUpperCase()} {}
              <Typography variant="overline">{product.strength}</Typography>
            </Typography>
            <Typography variant="subtitle1">{formatter.format(product.unitPrice)}</Typography>
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
            onClick={() => addToCart(product)}
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
