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
import formatter from "../../util/formatter";

import ORDER_STATUS from "../../constants/OrderStatus";
import "./Order.css";

export default function Order({ agentOrders }) {
  const classes = useStyles();

  const status = {
    draft: "Draft",
    under_review: "Under Review",
    active: "Active",
    completed: "Completed",
    rejected: "Rejected",
  };

  return (
    <div className={classes.header}>
      {agentOrders.length > 0 && (
        <Typography variant="h4" gutterBottom>
          List of Orders ({agentOrders.length})
        </Typography>
      )}
      <TableContainer component={Paper} className={classes.main}>
        <Table sx={{ minWidth: 650 }} size="large" aria-label="a dense table">
          <TableHead className={classes.tableHeader}>
            <TableRow>
              <TableCell align="center" className={classes.tableHeaderRows}>
                Status
              </TableCell>
              <TableCell align="center" className={classes.tableHeaderRows}>
                Order Number
              </TableCell>
              <TableCell align="center" className={classes.tableHeaderRows}>
                Shipment
              </TableCell>
              <TableCell align="center" className={classes.tableHeaderRows}>
                Invoice Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {agentOrders.map((order) => (
              <TableRow
                key={order.orderNumber}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell scope="row" align="center">
                  {status[order.status.toLowerCase()]}
                </TableCell>
                <TableCell scope="row" align="center">
                  <Link to={`/orders/${order.id}`}>
                    {order.orderNumber && order.orderNumber}
                  </Link>
                </TableCell>
                <TableCell scope="row" align="center">
                  {order.shipment && order.shipment}
                </TableCell>

                <TableCell scope="row" align="center">
                  {formatter.format(order.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
