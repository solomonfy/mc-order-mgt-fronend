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
import { Link } from "react-router-dom";
import useStyles from "./order-styles";
import { withStyles } from "@material-ui/core/styles";

import ORDER_STATUS from "../../constants/OrderStatus";
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

  function createData(id, orderNumber, shipment, status, amount) {
    return { id, orderNumber, shipment, status, amount };
  }

  for (const order of agentOrders) {
    let row = createData(
      order.id,
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
      <TableContainer component={Paper} className={classes.main}>
        <Table sx={{ minWidth: 650 }} size="large" aria-label="a dense table">
          <TableHead className={classes.tableHeader}>
            <TableRow>
              <TableCell className={classes.tableHeaderRows}>
                Order Number
              </TableCell>
              <TableCell align="right" className={classes.tableHeaderRows}>
                Shipment
              </TableCell>
              <TableCell align="right" className={classes.tableHeaderRows}>
                Status
              </TableCell>
              <TableCell align="right" className={classes.tableHeaderRows}>
                Invoice Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.orderNumber}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell scope="row">
                  <Link to={`/order-detail/${row.id}`}>
                    {row.orderNumber && row.orderNumber}
                  </Link>
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
