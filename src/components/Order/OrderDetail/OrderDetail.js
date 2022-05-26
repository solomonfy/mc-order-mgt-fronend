import React from "react";
import { useParams } from "react-router-dom";

const OrderDetail = ({ agentOrders }) => {

  const { id } = useParams();
  const thisOrder = agentOrders.find((order) => order.id === id);
  
  return (
    <div>
      <h1>{thisOrder.orderNumber}</h1>
    </div>
  );
};

export default OrderDetail;
