import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Products from "./containers/Products/Products";
import OrderContainer from "./containers/OrderContainer/OrderContainer";
import {
  NavBar,
  Cart,
  Dashboard,
  ProductDetail,
  Loader,
  Checkout,
} from "./components/";
import "./App.css";

const App = () => {
  const agentId = "61a905c174dce215a9daf103";

  const BASE_URL = "http://localhost:2020/api/v1";
  const PRODUCT_URL = `${BASE_URL}/products/list/`;
  const ORDER_URL = `${BASE_URL}/orders/list`;
  const AGENT_ORDER_URL = `${ORDER_URL}/agent/${agentId}`;
  const CAMUNDA_URL = "http://localhost:2525/engine-rest";
  const CAMUNDA_TASK = `${CAMUNDA_URL}/task/`;

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState({});
  const [orders, setOrders] = useState([]);
  const [agentOrders, setAgentOrders] = useState([]);
  // const [tasks, setTasks] = useState([]);
  const [cart, setCart] = useState([]);
  const [itemQty, setQty] = useState({});

  const fetchProducts = () => {
    fetch(PRODUCT_URL)
      .then((resp) => resp.json())
      .then((data) => {
        setProducts(data.data.products);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const fetchOrders = () => {
    fetch(ORDER_URL, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => {
        setOrders(data.data.orders);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const fetchAgentOrders = () => {
    fetch(AGENT_ORDER_URL, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => {
        setAgentOrders(data.data.orders);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  };

  // const fetchTasks = () => {
  //   fetch(CAMUNDA_TASK, {
  //     method: "GET",
  //   })
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       setTasks(data);
  //       console.log(data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setError(error);
  //     });
  // };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
    fetchAgentOrders();
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

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const emptyCart = () => {
    setCart(cart.slice(cart.length));
  };

  if (loading) {
    return <Loader />;
  }

  if (!loading) {
    return (
      <Router>
        <div>
          <NavBar cartItems={cart} />
          <Routes>
            <Route path="/" element={<Dashboard agentOrders={agentOrders} />} />
            <Route
              path="/products"
              element={
                <Products
                  products={products}
                  onAddToCart={handleAddToCart}
                  cartItems={cart}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={cart}
                  removeFromCart={removeFromCart}
                  handleEmptyCart={emptyCart}
                  handleQtyChange={handleQtyChange}
                />
              }
            />
            <Route
              path="/orders"
              element={
                <OrderContainer orders={orders} agentOrders={agentOrders} />
              }
            />

            <Route path="/checkout" element={<Checkout />} />
            <Route path="/product-detail" element={<ProductDetail />} />
          </Routes>
        </div>
      </Router>
    );
  }
};

export default App;
