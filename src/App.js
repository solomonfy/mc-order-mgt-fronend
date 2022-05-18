import React, { useState, useEffect } from "react";
import Products from "./containers/Products/Products";
import NavBar from "./components/NavBar/NavBar";
import Cart from "./components/Cart/Cart";
import Dashboard from "./components/Dashboard/Dashboard";
// import Loader from "./components/Loader";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
  // const [orders, setOrders] = useState([]);
  // const [agentOrders, setAgentOrders] = useState([]);
  // const [tasks, setTasks] = useState([]);
  const [cart, setCart] = useState([]);

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

  // const fetchOrders = () => {
  //   fetch(ORDER_URL, {
  //     method: "GET",
  //   })
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       setOrders(data.data.orders);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setError(error);
  //     });
  // };

  // const fetchAgentOrders = () => {
  //   fetch(AGENT_ORDER_URL, {
  //     method: "GET",
  //   })
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       setAgentOrders(data.data.orders);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setError(error);
  //     });
  // };

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
    // fetchOrders()
    // fetchAgentOrders()
    // fetchTasks()
  }, []);

  const handleAddToCart = (product, quantity) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const emptyCart = () => {
    setCart(cart.slice(cart.length));
  };

  if (loading) {
    return (
      <>
        <h1>Loading....</h1>
        {/* <Loader/> */}
      </>
    );
  }

  if (!loading) {
    return (
      <Router>
        <div>
          <NavBar cartItems={cart} />
          <Routes>
            <Route path="/" element={<Dashboard />} />
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
                  emptyCart={emptyCart}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    );
  }
};

export default App;
