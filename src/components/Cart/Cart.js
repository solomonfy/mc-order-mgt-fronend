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

export default function Cart({ agentId }) {
  const {
    cartProducts,
    removeFromCart,
    emptyCart,
    submitOrder,
    changeProductQty,
  } = useContext(CartContext);

  const [order, setOrder] = useState({});
  const [cartProductsWithQty, setCartProductsWithQty] = useState([]);
  const [prodQty, setProductQty] = useState();

  const classes = useStyles();
  const isEmpty = cartProducts.length === 0;
  const TAX_RATE = 0;
  let rows = [];

  const getProductsWithQty = (id, qty) => {
    console.log(id);
    console.log(qty);
    //productIdsWithQuantities[0].productId
    //productIdsWithQuantities[0].quantity
    //setTheObject(prevState => ({ ...prevState, currentOrNewKey: newValue}));
    setCartProductsWithQty((prev) => ({
      ...prev,
      productId: id,
      quantity: qty,
    }));
    handleSubmit();
  };

  const handleSubmit = () => {
    submitOrder(order, agentId);
    console.log(cartProductsWithQty);
  };

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
    // console.log(row)
  }

  function calcSubTotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  }

  const invoiceSubtotal = calcSubTotal(rows);
  const invoiceTaxes = (TAX_RATE * invoiceSubtotal) / 100;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  const tableHead = [
    "Generic Name",
    "Strength",
    "Pack Size",
    "Unit Price",
    "Quantity",
    "Subtotal",
    "Remove",
  ];

  const EmptyCart = () => {
    return (
      <>
        <Typography variant="h6" gutterBottom>
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
                <TableCell align="center" className={classes.tableHeader}>
                  Brand Name
                </TableCell>
                <TableCell align="center" className={classes.tableHeader}>
                  Generic Name
                </TableCell>
                <TableCell align="center" className={classes.tableHeader}>
                  Strength&nbsp;
                </TableCell>
                <TableCell align="center" className={classes.tableHeader}>
                  Pack Size&nbsp;
                </TableCell>
                <TableCell align="center" className={classes.tableHeader}>
                  Unit Price&nbsp;
                </TableCell>
                <TableCell align="center" className={classes.tableHeader}>
                  Quantity&nbsp;
                </TableCell>
                <TableCell align="center" className={classes.tableHeader}>
                  Subtotal &nbsp;
                </TableCell>
                <TableCell align="center">Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onChange={() => getProductsWithQty(row.id, row.qty)}
                >
                  <TableCell align="center" component="th" scope="row">
                    {row.brandName} {capitalizeFirstLetter(row.formulation)}
                  </TableCell>
                  <TableCell align="center">
                    {capitalizeFirstLetter(row.genericName)}
                  </TableCell>
                  <TableCell align="center">{row.strength}</TableCell>
                  <TableCell align="center">{row.packSize}</TableCell>
                  <TableCell align="center">
                    {formatter.format(row.unitPrice)}
                  </TableCell>
                  <TableCell align="center">
                    <input
                      type="number"
                      name="qty"
                      value={prodQty}
                      onChange={(e) => console.log(e.target.value)}
                    ></input>
                  </TableCell>
                  <TableCell align="center">
                    {formatter.format(row.price)}
                  </TableCell>
                  <TableCell align="center">
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
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <Typography
                    variant="h8"
                    mt={10}
                    mb={10}
                    className={classes.tableHeader}
                    align="right"
                  >
                    Sub-total:
                  </Typography>
                </TableCell>
                <TableCell className={classes.tableHeader} align="right">
                  {formatter.format(invoiceSubtotal)}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
              {TAX_RATE > 0 && (
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <Typography
                      variant="h8"
                      mt={10}
                      mb={10}
                      className={classes.tableHeader}
                      align="left"
                    >
                      Tax ({TAX_RATE}%):
                    </Typography>
                  </TableCell>
                  <TableCell className={classes.tableHeader} align="left">
                    {formatter.format(invoiceTaxes)}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <Typography
                    variant="h8"
                    gutterBottom
                    mt={10}
                    mb={10}
                    className={classes.tableHeader}
                    align="right"
                  >
                    Total:
                  </Typography>
                </TableCell>
                <TableCell className={classes.tableHeader} align="right">
                  {formatter.format(invoiceTotal)}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <br />
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
            // to="/checkout"
            // component={Link}
            onClick={(e) => handleSubmit(e)}
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
