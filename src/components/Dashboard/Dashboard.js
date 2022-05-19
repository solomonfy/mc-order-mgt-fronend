import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@material-ui/core";
import "./Dashboard.css";

const Dashboard = ({ allOrders }) => {
  // let timeOfDay;
  let loggedInUser = "Alen";
  const date = new Date();
  const hours = date.getHours();

  const timeOfDay = () => {
    if (hours < 12) {
      return "Good morning";
    } else if (hours >= 12 && hours < 17) {
      return "Good afternoon";
    }
    return "Good evening";
  };

  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

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
          {timeOfDay()}
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
        <Button
          size="small"
          color="primary"
          variant="outlined"
          component={Link}
          to="/products"
        >
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
