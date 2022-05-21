import React from "react";
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
import useStyles from "./order-styles";

import "./Order.css";

export default function Order({ agentOrders }) {
  const classes = useStyles();

  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  const status = {
    draft: "Draft",
    under_review: "Under Review",
    active: "Active",
    completed: "Completed",
    rejected: "Rejected",
  };

  let rows = [];

  function createData(orderNumber, shipment, status, amount) {
    return { orderNumber, shipment, status, amount };
  }

  for (const order of agentOrders) {
    let row = createData(
      order.orderNumber,
      order.shipment,
      order.status,
      order.amount
    );
    rows.push(row);
  }

  return (
    <div className={classes.header}>
      {rows.length > 0 && (
        <Typography variant="h4" gutterBottom>
          List of Orders
        </Typography>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="large" aria-label="a dense table">
          <TableHead className={classes.tableHeader}>
            <TableRow>
              <TableCell>Order Number</TableCell>
              <TableCell align="right">Shipment</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Invoice Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.orderNumber}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.orderNumber && row.orderNumber}
                </TableCell>
                <TableCell align="right">
                  {row.shipment && row.shipment}
                </TableCell>
                <TableCell align="right">
                  {status[row.status.toLowerCase()]}
                </TableCell>
                <TableCell align="right">
                  {formatter.format(row.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
