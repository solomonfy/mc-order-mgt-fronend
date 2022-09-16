import React, { useState } from "react";
import {
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

import ProductCard from "../../components/Product/ProductCard";
import useStyles from "./products-styles";

const therapeuticCategories = [
  "ANTI PAIN",
  "CARDIO VASCULAR",
  "CNS DRUGS",
  "ANTI DIABETIC",
  "DERMATOLOGY",
  "ANTI HISTAMIN",
];

// const categories = {
//   ANTI_PAIN: "ANTI PAIN",
//   CARDIO_VASCULAR: "CARDIO VASCULAR",
//   CNS_DRUGS: "CNS DRUGS",
//   ANTI_DIABETIC: "ANTI DIABETIC",
// };

function Products({ products }) {
  const classes = useStyles();
  const [category, setCategory] = useState("");

  const handleChange = (event) => {
    // const {
    //   target: { value },
    // } = event;
    // setCategory(typeof value === "string" ? value.split(",") : value);
    console.log(category);
    setCategory(event.target.value);
  };

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Typography variant="h4" gutterBottom className={classes.header}>
        List of products
      </Typography>

      <div>
        <FormControl >
          <InputLabel id="demo-simple-select-label">
            Product Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Category"
            onChange={handleChange}
          >
            {therapeuticCategories?.map((category) => {
              return <MenuItem value={category}>{category}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>
      <div></div>
      <br />

      <Grid container justifyContent="center" spacing={4}>
        {products?.map((product) => (
          <>
            <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
              <ProductCard key={product.id} product={product} />
            </Grid>
          </>
        ))}
      </Grid>
    </main>
  );
}

export default Products;
