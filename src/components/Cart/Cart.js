import * as React from "react";
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
} from "@material-ui/core";
import DeleteForeverSharpIcon from "@material-ui/icons/DeleteForeverSharp";

import { Link } from "react-router-dom";
import useStyles from "./cart-styles";

export default function Cart({ cartItems, removeFromCart, handleEmptyCart }) {
  const classes = useStyles();

  const isEmpty = cartItems.length === 0;
  let subtotal = 0;
  let rows = [];

  function createData(
    id,
    brandName,
    genericName,
    strength,
    packSize,
    unitPrice,
    formulation
  ) {
    return {
      id,
      brandName,
      genericName,
      strength,
      packSize,
      unitPrice,
      formulation,
    };
  }

  for (const item of cartItems) {
    let row = createData(
      item.id,
      item.brandName,
      item.genericName,
      item.strength,
      item.packSize,
      item.unitPrice,
      item.formulation
    );
    rows.push(row);
  }

  if (!isEmpty) {
    for (let i = 0; i < cartItems.length; i++) {
      const item = cartItems[i];
      subtotal += item.unitPrice * 100;
    }
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const EmptyCart = () => {
    return (
      <>
        <Typography variant="subtitle1" gutterBottom>
          No product available in the cart, {}
          <Link to="/products" className={classes.link}>
            add products now
          </Link>
        </Typography>
      </>
    );
  };

  const FilledCart = () => {
    return (
      <>
        <Typography
          variant="subtitle1"
          to="/products"
          component={Link}
          // gutterBottom
          // mt={8}
          mb={12}
        >
          Add more Products
        </Typography>
        <TableContainer component={Paper} gutterBottom>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Brand Name</TableCell>
                <TableCell align="center">Generic Name</TableCell>
                <TableCell align="center">Strength&nbsp;</TableCell>
                <TableCell align="center">Pack Size&nbsp;</TableCell>
                <TableCell align="center">Unit Price&nbsp;</TableCell>
                <TableCell align="center">Quantity&nbsp;</TableCell>
                <TableCell align="center">Subtotal &nbsp;</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.brandName}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.brandName} {capitalizeFirstLetter(row.formulation)}
                  </TableCell>
                  <TableCell align="right">{row.genericName}</TableCell>
                  <TableCell align="right">{row.strength}</TableCell>
                  <TableCell align="right">{row.packSize}</TableCell>
                  <TableCell align="right">${row.unitPrice}</TableCell>
                  <TableCell align="right">
                    <TextField
                      id="outlined-number"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">${row.unitPrice * 100}</TableCell>
                  <TableCell align="right">
                    <DeleteForeverSharpIcon
                      className={classes.emptyButton}
                      size="large"
                      type="button"
                      variant="contained"
                      color="secondary"
                      onClick={() => removeFromCart(row.id)}
                    ></DeleteForeverSharpIcon>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={classes.cardDetails}>
          <Typography variant="h6" gutterBottom mt={10} mb={10}>
            Subtotal: ${subtotal}
          </Typography>
        </div>
        <div className={classes.cardButtons}>
          <Button
            className={classes.emptyButton}
            size="small"
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleEmptyCart}
          >
            Empty Cart
          </Button>
          <Button
            size="small"
            type="button"
            variant="contained"
            color="primary"
            to="/checkout"
            component={Link}
          >
            Save as Draft
          </Button>
          <Button
            className={classes.chechoutButton}
            size="small"
            type="button"
            variant="contained"
            color="primary"
            to="/checkout"
            component={Link}
          >
            Submit Order
          </Button>
        </div>
      </>
    );
  };

  return (
    <Container>
      <div className={classes.toolbar} />
      {/* <div className={classes.header}></div> */}
      <Typography
        className={(classes.title, classes.header)}
        variant="h4"
        gutterBottom
        mt={2}
      >
        Shopping Cart
      </Typography>
      {isEmpty ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
}
