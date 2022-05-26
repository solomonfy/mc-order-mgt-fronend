import React from "react";
import Order from "../../components/Order/Order";
import SampleGrid from "../../components/SampleGrid/SampleGrid";

export default function OrderContainer({ orders, agentOrders }) {
  return (
    <div>
      <Order agentOrders={agentOrders} />
      <SampleGrid />
    </div>
  );
}
