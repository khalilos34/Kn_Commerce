import React, { useState, useEffect, createContext, useContext } from "react";
import toast from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [carteItmes, setCarteItmes] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [qty, setQty] = useState(1);
  //----------------------functions--------------------
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) {
        return 1;
      }
      return prevQty - 1;
    });
  };

  const onAdd = (product, quantity) => {
    const checkProductInCart = carteItmes.find(
      (item) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantity((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = carteItmes.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });

      setCarteItmes(updatedCartItems);
    } else {
      product.quantity = quantity;

      setCarteItmes([...carteItmes, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  //     const foundProduct = carteItmes.find((item) => item._id === id);
  //     const newCarteItmes = carteItmes.filter((item) => item._id !== id);
  //     if (value === "inc") {
  //       setCarteItmes([
  //         ...newCarteItmes,
  //         { ...foundProduct, quantity: foundProduct.quantity + 1 },
  //       ]);
  //       setTotalPrice((prevtotal) => prevtotal + foundProduct.price);
  //       setTotalQuantity((prevQty) => prevQty + 1);
  //     } else if (value === "dec") {
  //       if (foundProduct.quantity > 1) {
  //         setCarteItmes([
  //           ...newCarteItmes,
  //           { ...foundProduct, quantity: foundProduct.quantity - 1 },
  //         ]);
  //         setTotalPrice((prevtotal) => prevtotal - foundProduct.price);
  //         setTotalQuantity((prevQty) => prevQty - 1);
  //       }
  //     }
  //   };
  const onUpdate = (id, value) => {
    const foundIndex = carteItmes.findIndex((item) => item._id === id);
    const foundProduct = carteItmes[foundIndex];
    const newCarteItmes = [...carteItmes];

    if (value === "inc") {
      newCarteItmes[foundIndex] = {
        ...foundProduct,
        quantity: foundProduct.quantity + 1,
      };
      setCarteItmes(newCarteItmes);
      setTotalPrice((prevtotal) => prevtotal + foundProduct.price);
      setTotalQuantity((prevQty) => prevQty + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        newCarteItmes[foundIndex] = {
          ...foundProduct,
          quantity: foundProduct.quantity - 1,
        };
        setCarteItmes(newCarteItmes);
        setTotalPrice((prevtotal) => prevtotal - foundProduct.price);
        setTotalQuantity((prevQty) => prevQty - 1);
      }
    }
  };

  const onRemove = (product) => {
    const foundProduct = carteItmes.find((item) => item._id === product._id);
    const newCartItems = carteItmes.filter((item) => item._id !== product._id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantity(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    setCarteItmes(newCartItems);
  };

  return (
    <Context.Provider
      value={{
        showCart,
        carteItmes,
        totalPrice,
        totalQuantity,
        qty,
        setCarteItmes,

        setShowCart,
        incQty,
        decQty,
        onAdd,
        onUpdate,
        onRemove,
        setTotalPrice,
        setTotalQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
