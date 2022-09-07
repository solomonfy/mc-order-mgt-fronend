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
import formatter from "../../util/formatter";
import capitalizeFirstLetter from "../../util/capitalizeFirstLetter";

import { useContext } from "react";
import CartContext from "../../CartContext";

export default function Cart({addOrder}) {
  const { cartProducts, removeFromCart, emptyCart, changeProductQty } =
    useContext(CartContext);

  const classes = useStyles();
  const isEmpty = cartProducts.length === 0;
  const TAX_RATE = 0;
  let rows = [];

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
    qty
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

  for (const item of cartProducts) {
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

  const EmptyCart = () => {
    return (
      <>
        <Typography variant="subtitle1" gutterBottom>
          No product has been added in the cart {}
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
        <br />
        <br />
        <TableContainer component={Paper} mt={6}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 2 } }}
              >
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
                  <TableCell align="right">
                    {capitalizeFirstLetter(row.genericName)}
                  </TableCell>
                  <TableCell align="right">{row.strength}</TableCell>
                  <TableCell align="right">{row.packSize}</TableCell>
                  <TableCell align="right">
                    {formatter.format(row.unitPrice)}
                  </TableCell>
                  <TableCell align="right">
                    {/* <input
                      type="number"
                      e
                      value={row.qty}
                      onChange={changeProductQty}
                      min={100}
                      max={10000}
                    /> */}

                    <div className={classes.cardButtons}>
                      {/* <Button
                        size="small"
                        type="button"
                        variant="contained"
                        color="secondary"
                      >
                        -
                      </Button> */}

                      <Typography>{row.qty}</Typography>

                      {/* <Button
                        size="small"
                        type="button"
                        variant="contained"
                        color="primary"
                      >
                        +
                      </Button> */}
                    </div>
                  </TableCell>
                  <TableCell align="right">
                    {formatter.format(row.price)}
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
          <Typography variant="h6" mt={10} mb={10}>
            Sub-total: {formatter.format(invoiceSubtotal)}
          </Typography>
        </div>
        <div>
          <Typography variant="h6" mt={10} mb={10}>
            Tax ({TAX_RATE * 100}%): {formatter.format(invoiceTaxes)}
          </Typography>
        </div>
        <hr />
        <div>
          <Typography variant="h6" gutterBottom mt={10} mb={10}>
            Total: {formatter.format(invoiceTotal)}
          </Typography>
        </div>
        <div className={classes.cardButtons}>
          <Button
            className={classes.emptyButton}
            size="small"
            type="button"
            variant="contained"
            color="secondary"
            onClick={emptyCart}
          >
            Empty Cart
          </Button>
          <Button
            className={classes.emptyButton}
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
            onClick={addOrder}
          >
            Submit Order
          </Button>
          <br />
          <br />
        </div>
      </>
    );
  };

  return (
    <Container>
      <div className={classes.toolbar} />
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
