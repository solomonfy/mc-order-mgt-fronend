import React from "react";
import "./OrderContainer.css";
import Order from "../../components/Order/Order";

export default function OrderContainer({ orders, agentOrders }) {
  return (
    <div>
      <Order agentOrders={agentOrders} />
    </div>
  );
}
