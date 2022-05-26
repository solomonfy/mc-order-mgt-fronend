import * as React from "react";
import { Box, CircularProgress } from "@material-ui/core";
import "./Loader.css";

export default function Loader() {
  return (
    <>
      <div className="loader">
        <Box>
          <CircularProgress size="10rem" />
        </Box>
      </div>

      <div className="loader-text">
        <h2>Loading...</h2>
      </div>
    </>
  );
}
