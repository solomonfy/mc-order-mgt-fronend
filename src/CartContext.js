import React, { createContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [qty, setProductQty] = useState();

  const addToCart = (product) => {
    setCartProducts((prevState) => [...prevState, { ...product, qty: 100 }]);
  };

  const removeFromCart = (id) => {
    setCartProducts(cartProducts.filter((product) => product.id !== id));
  };

  const emptyCart = () => {
    setCartProducts(cartProducts.slice(cartProducts.length));
  };

  const changeProductQty = (event) => {
    setProductQty(event.target.value);
    console.log(event.target.value);
  };

  const submitOrder = async (order, agentId) => {
    let responseObject = {
      timeStamp: new Date(),
      data: { order: order },
    };
    console.log(agentId);
    
    // const resp = await fetch(`${ORDER_URL}/create-order/${agentId}`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ responseObject: responseObject }),
    // });
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        changeProductQty,
        addToCart,
        removeFromCart,
        emptyCart,
        submitOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
