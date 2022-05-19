import * as React from "react";

import { Box, CircularProgress } from "@material-ui/core";

export default function Loader() {
  return (
    <Box sx={{ display: "flex" }} >
      <CircularProgress size="10rem" />
    </Box>
  );
}
