import React from "react";
import { useParams } from "react-router-dom";
import formatter from "../../../util/formatter";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@material-ui/core";

const OrderDetail = ({ agentOrders, products }) => {
  const { id } = useParams();
  const thisOrder = agentOrders.find((order) => order.id === id);
  const productIdsWithQuantities = thisOrder.productIdsWithQuantities;

  const productsInOrder = [];

  // for (let i = 0; i < productIdsWithQuantities.length; i++) {
  //   let product = products.find(
  //     (p) => p.id === productIdsWithQuantities[i].productId
  //   );
  //   let qty = productIdsWithQuantities[i].quantity;
  //   productsInOrder.push({ ...product, qty });
  // }

  for (const item of productIdsWithQuantities) {
    let product = products.find((p) => p.id === item.productId);
    let qty = item.quantity;
    productsInOrder.push({ ...product, qty });
  }

  console.log(productsInOrder);

  return (
    <div>
      <div className="order-summary">
        <h1>Order Number - {thisOrder.orderNumber}</h1>
        <h2>Amount - {formatter.format(thisOrder.amount)}</h2>
        <h2>Shipment - {thisOrder.shipment}</h2>
        <h2>Order status - {thisOrder.status}</h2>
        <h2>Created By - {thisOrder.createdBy}</h2>
        <button>Back</button>
      </div>
      {productsInOrder.length > 0 && (
        <div className="products-list">
          <h3>List of products</h3>
          {/* <table>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Total Price</th>
            </tr>
            {productsInOrder.map((product) => (
              <tr>
                <td>
                  {product.brandName}/{product.genericName} {product.strength}{" "}
                  {product.formulation} {product.packSize}
                </td>

                <td>{product.qty}</td>
                <td>{formatter.format(product.unitPrice)}</td>
                <td>{formatter.format(product.unitPrice * product.qty)}</td>
              </tr>
            ))}
          </table> */}

          <TableContainer component={Paper}>
            <Table
              sx={{ maxWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Qty</TableCell>
                  <TableCell align="right">Unit Price</TableCell>
                  <TableCell align="right">Total Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productsInOrder.map((product) => (
                  <TableRow>
                    <TableCell align="left">
                      {product.brandName}/{product.genericName}{" "}
                      {product.strength} {product.formulation}{" "}
                      {product.packSize}
                    </TableCell>
                    <TableCell align="right">{product.qty}</TableCell>
                    <TableCell align="right">
                      {formatter.format(product.unitPrice)}
                    </TableCell>
                    <TableCell align="right">
                      {formatter.format(product.unitPrice * product.qty)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
