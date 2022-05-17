import React from "react";
import { Grid } from "@material-ui/core";

import ProductCard from "../../components/Product/ProductCard";
// import "./products.css";
import useStyles from "./products-styles";

function Products({ products, onAddToCart, cartItems }) {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify="center" spacing={4}>
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <ProductCard
              product={product}
              onAddToCart={onAddToCart}
              cartItems={cartItems}
            />
          </Grid>
        ))}
      </Grid>
    </main>
  );
}

export default Products;
