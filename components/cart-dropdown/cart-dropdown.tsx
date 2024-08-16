"use client";

import { useContext } from "react";
import CartItem from "../cart-item/cart-item";
import styles from "./cart-dropdown.module.css";
import { CartContext, CartItemType } from "../../contexts/cart.context";
import Button from "../button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CartDropDown = () => {
  const router = useRouter();
  const { cartItems, setIsCartOpen } = useContext(CartContext);

  const handleCheckout = () => {
    router.push("/checkout");
    setIsCartOpen(false);
  };

  return (
    <div className={styles["cart-dropdown-container"]}>
      <div className={styles["cart-items"]}>
        {cartItems.length ? (
          cartItems.map((cartItem: CartItemType) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))
        ) : (
          <span className={styles["empty-message"]}>Your cart is empty</span>
        )}
      </div>
      {cartItems.length > 0 && (
        <Button buttonType="inverted" onClick={handleCheckout}>
          GO TO CHECKOUT
        </Button>
      )}
    </div>
  );
};

export default CartDropDown;
