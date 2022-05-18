import React from "react";
import "./Dashboard.css";

import {
  Box,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const Dashboard = ({ allOrders }) => {
  let timeOfDay;
  let loggedInUser = "Alen";
  const date = new Date();
  const hours = date.getHours();

  if (hours < 12) {
    timeOfDay = "Good morning ";
  } else if (hours >= 12 && hours < 17) {
    timeOfDay = "Good afternoon ";
  } else {
    timeOfDay = "Good evening ";
  }

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          variant="h5"
          component="div"
          gutterBottom
        >
          {timeOfDay}
          {bull}
          {loggedInUser}
        </Typography>

        <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
        <Typography variant="body2">
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" variant="outlined">
          Place Order
        </Button>
        <Button size="small" color="info" variant="outlined">
          Check Order
        </Button>
      </CardActions>
    </React.Fragment>
  );

  return (
    <Box sx={{ maxWidth: 500 }} mt={12} mb={6}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
};

export default Dashboard;
