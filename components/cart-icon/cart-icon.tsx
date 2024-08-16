"use client";

import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import ShoppingIcon from "../../public/shopping-bag.svg";
import styles from "./cart-icon.module.css";
import Image from "next/image";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  return (
    <div className={styles["cart-icon-container"]} onClick={toggleCart}>
      <Image
        src={ShoppingIcon}
        height={50}
        width={50}
        alt="shoppingicon"
        className={styles["shopping-icon"]}
      />
      <span className={styles["item-count"]}>{cartCount}</span>
    </div>
  );
};

export default CartIcon;
