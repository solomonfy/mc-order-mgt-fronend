import React, { createContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [qty, setProductQty] = useState();

  const addToCart = (product) => {
    setCartProducts((prevState) => [...prevState, {...product, qty: 100}]);
  };

  const removeFromCart = (id) => {
    setCartProducts(cartProducts.filter((product) => product.id !== id));
  };

  const emptyCart = () => {
    setCartProducts(cartProducts.slice(cartProducts.length));
  };

  const changeProductQty = (event) => {
    setProductQty(event.target.value)
    console.log(qty)
  }



  return (
    <CartContext.Provider
      value={{ cartProducts, qty, changeProductQty, addToCart, removeFromCart, emptyCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
