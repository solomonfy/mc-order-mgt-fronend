import React from "react";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from "@material-ui/core";

import useStyles from "./checkout-styles";

const Checkout = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Review Order
          </Typography>
          <Stepper className={classes.stepper}></Stepper>
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
