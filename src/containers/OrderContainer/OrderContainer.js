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
import useStyles from "./orderContainer-styles";
import formatter from "../../util/formatter";
import STATUS from "../../constants/OrderStatus";

export default function OrderContainer({ agentOrders }) {
  const classes = useStyles();
  let orderCount = agentOrders?.length;

  return (
    <div className={classes.header}>
      {orderCount > 0 ? (
        <>
          <Typography variant="h4" gutterBottom>
            List of Orders ({agentOrders.length})
          </Typography>
          <TableContainer component={Paper} className={classes.main}>
            <Table
              sx={{ minWidth: 650 }}
              size="medium"
              aria-label="a dense table"
            >
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
                {agentOrders?.map((order) => (
                  <TableRow
                    key={order.orderNumber}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    className="rows"
                  >
                    <TableCell
                      scope="row"
                      align="center"
                      className={classes.tableRows}
                    >
                      {STATUS[order.status.toLowerCase()]}
                    </TableCell>
                    <TableCell
                      scope="row"
                      align="center"
                      className={classes.tableRows}
                    >
                      <Link to={`/orders/${order.id}`}>
                        {order.orderNumber && order.orderNumber}
                      </Link>
                    </TableCell>
                    <TableCell
                      scope="row"
                      align="center"
                      className={classes.tableRows}
                    >
                      {order.shipment && order.shipment}
                    </TableCell>

                    <TableCell
                      scope="row"
                      align="center"
                      className={classes.tableRows}
                    >
                      <Link to={`/orders/${order.id}`}>
                        {formatter.format(order.amount)}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Typography variant="h4" gutterBottom>
          No order to display
        </Typography>
      )}
    </div>
  );
}
