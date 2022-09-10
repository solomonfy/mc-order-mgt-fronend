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

const OrderSummary = ({ agentOrders }) => {
  const STATUS = [
    { draft: "Draft" },
    { under_review: "Under Review" },
    { active: "Active" },
    { completed: "Completed" },
    { rejected: "Rejected" },
  ];

  let draftCount = 0;
  let underReviewCount = 0;
  let activeCount = 0;
  let completedCount = 0;
  let rejectedCount = 0;

  let newStat = "";
  let arr;
  let orderCount = agentOrders?.length;

  if (orderCount > 0) {
    for (let i = 0; i < agentOrders.length; i++) {
      const orderStatus = agentOrders[i].status;
      switch (orderStatus) {
        case "Draft":
          draftCount += 1;
          break;
        case "Active":
          activeCount += 1;
          break;
        case "Under_Review":
          underReviewCount += 1;
          break;
        case "Completed":
          completedCount += 1;
          break;
        case "Rejected":
          rejectedCount += 1;
          break;
        default:
          console.log(`Sorry, there is no order status of ${orderStatus}`);
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
                arr = Object.values(stat);
                newStat =
                  arr.length > 1
                    ? `${arr[0].toUpperCase()} ${arr[1].toUpperCase()}`
                    : arr[0].toUpperCase();
                return (
                  <TableCell component="th" scope="row" align="right">
                    {newStat}
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
