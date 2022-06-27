import React from "react";
import { Grid, Typography } from "@material-ui/core";

import ProductCard from "../../components/Product/ProductCard";
import ProductDetail from "../../components/Product/ProductDetail";

import useStyles from "./products-styles";

function Products({ products }) {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Typography variant="h4" gutterBottom className={classes.header}>
        List of products
      </Typography>
      <Grid container justifyContent="center" spacing={4}>
        {products.map((product) => (
          <>
            <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
              <ProductCard key={product.id} product={product} />
            </Grid>
          </>
        ))}
      </Grid>
    </main>
  );
}

export default Products;
