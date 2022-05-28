import React from "react";
import { useParams } from "react-router-dom";
import formatter from "../../../util/formatter"

const OrderDetail = ({ agentOrders, products }) => {
  const { id } = useParams();
  const thisOrder = agentOrders.find((order) => order.id === id);
  const productIdsWithQuantities = thisOrder.productIdsWithQuantities;
  
  const productsDetailInOrder = [];

  for (let i = 0; i < productIdsWithQuantities.length; i++) {
    let product = products.find(
      (p) => p.id === productIdsWithQuantities[i].productId
    );
    let qty = productIdsWithQuantities[i].quantity;
    productsDetailInOrder.push({ ...product, qty });
  }

  console.log(productsDetailInOrder);

  return (
    <div>
      <h1>Order Number - {thisOrder.orderNumber}</h1>
      <h2>Amount - {formatter.format(thisOrder.amount)}</h2>
      <h2>Shipment - {thisOrder.shipment}</h2>
      <h2>Order status - {thisOrder.status}</h2>
      <h2>Created By - {thisOrder.createdBy}</h2>
    </div>
  );
};

export default OrderDetail;
