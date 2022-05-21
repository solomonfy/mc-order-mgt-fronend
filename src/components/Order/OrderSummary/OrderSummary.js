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

import "../Order.css";

const OrderSummary = ({ agentOrders }) => {
  const status = {
    draft: "Draft",
    under_review: "Under Review",
    active: "Active",
    completed: "Completed",
    rejected: "Rejected",
  };

  let ourOrderCount;

  let statusCount = {
    draft: 0,
    under_review: 0,
    active: 0,
    completed: 0,
    rejected: 0,
  };

  if (agentOrders) {
    ourOrderCount = agentOrders.length;
    agentOrders.map((order) => {
      if (status[order.status.toLowerCase()]) {
        statusCount[order.status.toLowerCase()] += 1;
      }
    });
  }

  return (
    <div className="order-summary-main">
      <Typography className="title">
        ({ourOrderCount}) {ourOrderCount === 1 ? "Order" : "Orders"}
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>{status["draft"]}</TableCell>
              <TableCell align="right">{status["under_review"]}</TableCell>
              <TableCell align="right">{status["active"]}</TableCell>
              <TableCell align="right">{status["completed"]}</TableCell>
              <TableCell align="right">{status["rejected"]}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                {statusCount["under_review"]}
              </TableCell>
              <TableCell align="right">{statusCount["draft"]}</TableCell>
              <TableCell align="right">{statusCount["active"]}</TableCell>
              <TableCell align="right">{statusCount["completed"]}</TableCell>
              <TableCell align="right">{statusCount["rejected"]}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrderSummary;
