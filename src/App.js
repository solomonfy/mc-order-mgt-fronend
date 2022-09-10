import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Products from "./containers/Products/Products";
import OrderContainer from "./containers/OrderContainer/OrderContainer";
// import Login from './components/LoginForm/Login';
import {
  NavBar,
  Cart,
  Dashboard,
  ProductDetail,
  Loader,
  Checkout,
  OrderDetail,
  Footer,
  // Login,
  NotFound,
} from "./components/exportComponents";
import "./App.css";

import { CartProvider } from "./CartContext";

const App = () => {
  // const agentId = "6318fa0af72172404e13fc07";
  // no order for 6318fa0af72172404e13fc07

  const agentId = "6240dc0f5ce2052689ccdf24";
  //4 orders for 6240dc0f5ce2052689ccdf24

  const BASE_URL = "http://localhost:2020/api/v1";
  const ORDER_URL = `${BASE_URL}/orders`;
  const CAMUNDA_TASK = "http://localhost:2525/engine-rest/task/";

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState({});
  const [orders, setOrders] = useState([]);
  const [agentOrders, setAgentOrders] = useState([]);
  const [order, setOrder] = useState({});
  const [cart, setCart] = useState([]);
  const [itemQty, setQty] = useState({});
  const [tasks, setTasks] = useState([]);
  const [agentInfo, setAgentInfo] = useState({});

  const fetchProducts = async () => {
    const resp = await fetch(`${BASE_URL}/products/list/`);
    const data = await resp.json();
    return data.data.products;
  };

  const fetchOrders = async () => {
    const resp = await fetch(`${ORDER_URL}/list`);
    const data = await resp.json();
    return data.data.orders;
  };

  const fetchAgentOrders = async () => {
    const resp = await fetch(`${ORDER_URL}/list/agent/${agentId}`);
    const data = await resp.json();
    return data.data.orders;
  };

  const fetchAgentInfo = async () => {
    const resp = await fetch(`${BASE_URL}/agents/list/${agentId}`).catch(
      function (error) {
        console.log(error);
      }
    );
    const agentInfo = await resp.json();
    return agentInfo;
  };

  const fetchTasks = async () => {
    const resp = await fetch(CAMUNDA_TASK);
    const data = await resp.json();
    return data;
  };

  const submitOrder = async (order, agentId) => {
    const resp = await fetch(`${ORDER_URL}/create-order/${agentId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
  };

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchProducts();
      setProducts(products);
      setLoading(false);
    };

    const getOrders = async () => {
      const orders = await fetchOrders();
      setOrders(orders);
      setLoading(false);
    };

    const getAgentOrders = async () => {
      const orders = await fetchAgentOrders();
      setAgentOrders(orders);
      setLoading(false);
    };

    const getAgentInfo = async () => {
      const agent = await fetchAgentInfo();
      setAgentInfo(agent);
    };
    getProducts();
    getAgentInfo();
    getOrders();
    getAgentOrders();

    // fetchTasks()
  }, []);

  const handleAddToCart = (product, qty) => {
    setCart((prev) => [...prev, product]);
  };

  const handleQtyChange = (product, qty) => {
    setQty((prevState) => ({ ...prevState, [product.quantity]: qty }));
    console.log(product);
    console.log(qty);
  };

  if (loading) {
    return (
      <>
        <Loader />
        <Footer />
      </>
    );
  }

  if (!loading) {
    return (
      <CartProvider>
        {/* <Login/> */}

        <div>
          <NavBar />
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard agentOrders={agentOrders} agentInfo={agentInfo} />
              }
            />
            <Route
              path="/products"
              element={<Products products={products} />}
            />
            <Route
              path="/cart"
              element={
                <Cart
                  handleQtyChange={handleQtyChange}
                  submitOrder={submitOrder}
                />
              }
            />
            <Route
              path="/orders"
              element={
                <OrderContainer orders={orders} agentOrders={agentOrders} />
              }
            />
            <Route
              path="/orders/:id"
              element={
                <OrderDetail agentOrders={agentOrders} products={products} />
              }
            />

            <Route path="/checkout" element={<Checkout />} />
            <Route
              path="/product-detail/:id"
              element={<ProductDetail products={products} />}
            />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>

        <Footer />
      </CartProvider>
    );
  }
};

export default App;
