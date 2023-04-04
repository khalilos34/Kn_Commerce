import React, { useRef } from "react";
import Link from "next/link";

import {
  AiOutlineShopping,
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineLeft,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { useStateContext } from "@/context/StateContext";

import { urlFor } from "@/lib/client";
import getStripe from "@/lib/getStripe";
import { toast } from "react-hot-toast";
import axios from "axios";

const Cart = () => {
  const handelCheckout = async () => {
    try {
      const stripe = await getStripe();
      const response = await axios.post("/api/stripe", carteItmes);
      if (response.statusCode === 500) return;
      const data = await response.data;
      toast.loading("Redirecting...");
      return stripe.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      console.error(error);
      // Handle the error here
    }
  };
  const cartRef = useRef();
  const {
    totalPrice,
    setShowCart,
    totalQuantity,
    carteItmes,
    onUpdate,
    onRemove,
  } = useStateContext();
  console.log("those are catr items ", carteItmes);
  return (
    <div className="cart-wrapper " ref={cartRef}>
      <div className="cart-container">
        <button
          type="button "
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading"> Your Cart</span>
          <span className="cart-num-items"> ({totalQuantity}) items</span>
        </button>
        {carteItmes.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={135} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button className="btn" type onClick={() => setShowCart(false)}>
                continue shopping
              </button>{" "}
            </Link>
          </div>
        )}
        <div className="product-container">
          {carteItmes.length >= 1 &&
            carteItmes.map((item, index) => (
              <div className="product" key={item._id}>
                <img
                  src={urlFor(item?.image[0])}
                  alt="/"
                  className="cart-product-image"
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>{item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span className="minus">
                          <AiOutlineMinus
                            onClick={() => onUpdate(item._id, "dec")}
                          />
                        </span>
                        <span className="num">{item.quantity}</span>
                        <span className="plus">
                          <AiOutlinePlus
                            onClick={() => onUpdate(item._id, "inc")}
                          />
                        </span>
                      </p>
                    </div>
                    <button type="button " className="remove-item">
                      <TiDeleteOutline
                        onClick={() => onRemove(item)}
                        size={30}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {carteItmes.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handelCheckout}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
