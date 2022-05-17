import React from "react";
import useStyles from "./cart-styles";
import { Container, Typography, Button, Grid } from "@material-ui/core";

function Cart({ cartItems }) {
  const classes = useStyles();
  const isEmpty = cartItems.length === 0;
  let subtotal = 0;

  if (!isEmpty) {
    for (let i = 0; i < cartItems.length; i++) {
      const item = cartItems[i];
      subtotal += item.unitPrice * 100;
    }
  }

  const EmptyCart = () => {
    return (
      <Typography variant="subtitle1">
        "No product available in the cart"
      </Typography>
    );
  };

  const FilledCart = () => {
    return (
      <>
        <Grid container spacing={3}>
          {cartItems.map((product) => (
            <Grid item xs={12} sm={4} key={product.id}>
              <div>{product.brandName}</div>
            </Grid>
          ))}
        </Grid>
        <div className={classes.cardDetails}>
          <Typography variant="h4">Subtotal: ${subtotal}</Typography>
          <div>
            <Button
              className={classes.emptyButton}
              size="large"
              type="button"
              variant="contained"
              color="secondary"
            >
              Empty Cart
            </Button>
            <Button
              className={classes.chechoutButton}
              size="large"
              type="button"
              variant="contained"
              color="primary"
            >
              Checkout
            </Button>
          </div>
        </div>
      </>
    );
  };

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3">
        Shopping Cart
      </Typography>
      {isEmpty ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
}

export default Cart;
