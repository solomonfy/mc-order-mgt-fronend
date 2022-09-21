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

import "./OrderSummary.css";
import orderStatus from "../../../constants/OrderStatus";
import capitalizeFirstLetter from "../../../util/capitalizeFirstLetter";

const OrderSummary = ({ agentOrders }) => {
  const STATUS = Object.keys(orderStatus);

  // need to update the counts as an array and loop to display on the table
  let draftCount = 0;
  let submittedCount = 0;
  let underReviewCount = 0;
  let activeCount = 0;
  let completedCount = 0;
  let rejectedCount = 0;

  let statWithCount = {
    draft: 0,
    submitted: 0,
    under_review: 0,
    active: 0,
    completed: 0,
    rejected: 0,
  };

  const orderCount = agentOrders?.length;

  if (orderCount > 0) {
    for (let order of agentOrders) {
      const stat = capitalizeFirstLetter(order.status);
      switch (stat) {
        case "Draft":
          draftCount += 1;
          break;
        case "Submitted":
          submittedCount += 1;
          break;
        case "Active":
          activeCount += 1;
          break;
        case "Under review":
          underReviewCount += 1;
          break;
        case "Completed":
          completedCount += 1;
          break;
        case "Rejected":
          rejectedCount += 1;
          break;
        default:
          console.log(`There is no order status of ${orderStatus}`);
      }
    }
  }
  return (
    <div className="order-summary-main">
      {orderCount > 0 ? (
        <Typography className="title">
          ({orderCount}) {orderCount === 1 ? "Order" : "Orders"}
        </Typography>
      ) : (
        <Typography className="title">No orders to display</Typography>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {STATUS.map((stat) => {
                return (
                  <TableCell component="th" scope="row" align="right">
                    {stat.toUpperCase()}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row" align="right">
                {draftCount}
              </TableCell>
              <TableCell component="th" scope="row" align="right">
                {submittedCount}
              </TableCell>
              <TableCell component="th" scope="row" align="right">
                {underReviewCount}
              </TableCell>
              <TableCell component="th" scope="row" align="right">
                {activeCount}
              </TableCell>
              <TableCell component="th" scope="row" align="right">
                {completedCount}
              </TableCell>
              <TableCell component="th" scope="row" align="right">
                {rejectedCount}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrderSummary;
