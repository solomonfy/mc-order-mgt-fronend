import React from "react";
import Order from "../../components/Order/Order";

export default function OrderContainer({ orders, agentOrders }) {
  return (
    <div>
      <Order agentOrders={agentOrders} />
    </div>
  );
}
