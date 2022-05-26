import React from "react";
import { useParams } from "react-router-dom";

const ProductDetail = ({ products }) => {
  const { id } = useParams();
  const thisProduct = products.find((prod) => prod.id === id);

  console.log(thisProduct);
  return (
    <div>
      <h1>{`${thisProduct.brandName} ${thisProduct.strength}`}</h1>
    </div>
  );
};

export default ProductDetail;
