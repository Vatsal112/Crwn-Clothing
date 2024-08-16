"use client";

import { useContext } from "react";
import styles from "./checkout-item.module.css";
import { CartContext, CartItemType } from "../../contexts/cart.context";

const CheckoutItem = ({ item }: { item: CartItemType }) => {
  const { imageUrl, name, price, quantity } = item;
  const { clearItemFromCart, addItemToCart, removeItemsFromCart } =
    useContext(CartContext);

  const clearItemHandler = () => {
    clearItemFromCart(item);
  };

  const addItemHandler = () => addItemToCart(item);
  const removeItemHandler = () => removeItemsFromCart(item);
  return (
    <div className={styles["checkout-item-container"]}>
      <div className={styles["image-container"]}>
        <img src={imageUrl} alt={`${name}`} className={styles.image} />
      </div>
      <span className={styles.name}>{name}</span>
      <span className={styles.quantity}>
        <div className={styles.arrow} onClick={removeItemHandler}>
          &#10094;
        </div>
        <span className={styles.value}>{quantity}</span>
        <div className={styles.arrow} onClick={addItemHandler}>
          &#10095;
        </div>
      </span>
      <span className={styles.price}>{price}</span>
      <span className={styles["remove-button"]} onClick={clearItemHandler}>
        &#10005;
      </span>
    </div>
  );
};
export default CheckoutItem;
