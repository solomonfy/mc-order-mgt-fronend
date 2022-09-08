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

  // console.log(agentOrders);

  let ourOrderCount;

  let statusCount = {
    draft: 0,
    under_review: 0,
    active: 0,
    completed: 0,
    rejected: 0,
  };

  let statusWithCount = [
    { draft: 0 },
    { under_review: 0 },
    { active: 0 },
    { completed: 0 },
    { rejected: 0 },
  ];

  let newStat = "";
  let arr;

  if (agentOrders.length > 0) {
    ourOrderCount = agentOrders.length;
    agentOrders.map((order) => {
      // for (let i = 0; i < statusWithCount.length; i++) {
        if (order.status === Object.keys(statusWithCount[0])[0]) {
          Object.values(statusWithCount[0])[0] += 1;
        }
        console.log(Object.values(statusWithCount[0])[0]);
      // }
      // for (let stat of statusWithCount) {
      //   if (Object.keys(stat)[0] === order.status) {
      //     console.log(Object.keys(stat)[0] === order.status);
      //     Object.values(stat)[0] += 1;
      //   }
      //   console.log(Object.values(stat)[0]);
      // }
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
              {statusWithCount.map((stat) => {
                arr = Object.keys(stat);
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
              {statusWithCount.map((stat) => {
                return (
                  <TableCell component="th" scope="row" align="right">
                    {Object.values(stat)[0]}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrderSummary;
