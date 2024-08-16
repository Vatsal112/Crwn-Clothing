"use client";

import { useContext } from "react";
import styles from "./product-card.module.css";
import { CartContext, CartItemType } from "../../contexts/cart.context";
import Button from "../button";
import Image from "next/image";
import toast from "react-hot-toast";

const ProductCard = ({ product }: { product: CartItemType }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => {
    addItemToCart(product);
    toast.success("Item added to cart");
  };
  return (
    <div className={styles["product-card-container"]}>
      <Image
        src={imageUrl}
        alt={name}
        width={239}
        height={327}
        className={styles.image}
      />
      <div className={styles.footer}>
        <span className={styles.name}>{name}</span>
        <span className={styles.price}>${price}</span>
      </div>
      <div className={styles.button}>
        <Button buttonType="inverted" onClick={addProductToCart}>
          Add to cart
        </Button>
      </div>
    </div>
  );
};
export default ProductCard;
