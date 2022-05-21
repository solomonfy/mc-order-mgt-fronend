import React, { useState } from "react";
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
} from "@material-ui/core";
import DeleteForeverSharpIcon from "@material-ui/icons/DeleteForeverSharp";

import { Link } from "react-router-dom";
import useStyles from "./cart-styles";

export default function Cart({
  cartItems,
  removeFromCart,
  handleEmptyCart,
  handleQtyChange,
}) {
  const [itemQty, setItemQty] = useState(100);

  const classes = useStyles();
  const isEmpty = cartItems.length === 0;
  let subtotal = 0;
  let rows = [];
  const TAX_RATE = 0.1;

  function handleQtyChange(e, product) {
    console.log(product);
    setItemQty(e.target.value);
  }

  const setQuantity = (product) => {
    product.quantity += product.quantity;
    console.log(product.quantity);
  };

  function currencyFormat(num) {
    return "$" + `${num.toFixed(2)}`;
  }

  function priceRow(qty, unitPrice) {
    return qty * unitPrice;
  }

  function createRows(
    id,
    brandName,
    genericName,
    formulation,
    strength,
    packSize,
    unitPrice,
    qty = 100
  ) {
    const price = priceRow(qty, unitPrice);
    return {
      id,
      brandName,
      genericName,
      formulation,
      strength,
      packSize,
      unitPrice,
      qty,
      price,
    };
  }

  for (const item of cartItems) {
    let row = createRows(
      item.id,
      item.brandName,
      item.genericName,
      item.formulation,
      item.strength,
      item.packSize,
      item.unitPrice,
      item.qty,
      item.price
    );
    rows.push(row);
  }

  function calcSubTotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  }

  const invoiceSubtotal = calcSubTotal(rows);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  // if (!isEmpty) {
  //   for (let i = 0; i < cartItems.length; i++) {
  //     const item = cartItems[i];
  //     calcSubTotal += item.unitPrice * 100;
  //   }
  // }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const EmptyCart = () => {
    return (
      <>
        <Typography variant="subtitle1" gutterBottom>
          No product available in the cart {}
        </Typography>
        <Button
          color="primary"
          size="small"
          type="button"
          variant="contained"
          to="/products"
          component={Link}
        >
          add products now
        </Button>
      </>
    );
  };

  const FilledCart = () => {
    return (
      <>
        <Button
          color="primary"
          size="small"
          type="button"
          variant="outlined"
          to="/products"
          component={Link}
          mb={6}
        >
          Add more Products
        </Button>
        <TableContainer component={Paper} gutterBottom mt={6}>
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
                  <TableCell align="right">
                    {currencyFormat(row.unitPrice)}
                  </TableCell>
                  <TableCell align="right">
                    <input
                      type="number"
                      e
                      // value={itemQty}
                      min={100}
                      max={10000}
                      // onChange ={(e, row) =>handleQtyChange(e,row)}
                      onChange={() => setQuantity(row)}
                    />
                  </TableCell>
                  <TableCell align="right">
                    {currencyFormat(row.price)}
                  </TableCell>
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
            Subtotal: {currencyFormat(invoiceTotal)}
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
