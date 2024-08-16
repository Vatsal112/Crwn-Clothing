"use client";

import { useContext } from "react";
import { CartContext, CartItemType } from "../../contexts/cart.context";
import styles from "./checkout.module.css";
import CheckoutItem from "../checkout-item/checkout-item";
import Button from "../button";
import { UserContext } from "@/contexts/user.contexts";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Checkout = () => {
  const { cartItems, cartTotal, resetCart } = useContext(CartContext);
  const router = useRouter();

  const { currentUser }: any = useContext(UserContext);

  const handleOrderClick = () => {
    if (!currentUser) {
      toast.error("You must be logged in");
      return router.push("/auth");
    }

    toast.success("Order has been placed");
    router.push("/");
    return resetCart();
  };

  return (
    <div className={styles["checkout-container"]}>
      <div className={styles["checkout-header"]}>
        <div className={styles["header-block"]}>
          <span>Products</span>
        </div>
        <div className={styles["header-block"]}>
          <span>Description</span>
        </div>
        <div className={styles["header-block"]}>
          <span>Quantity</span>
        </div>
        <div className={styles["header-block"]}>
          <span>Price</span>
        </div>
        <div className={styles["header-block"]}>
          <span>Remove</span>
        </div>
      </div>

      {cartItems.map((item: CartItemType) => {
        return <CheckoutItem key={item.id} item={item} />;
      })}
      <span className={styles.total}>TOTAL: ${cartTotal}</span>

      <div className={styles.orderBtn}>
        <Button type="button" buttonType="inverted" onClick={handleOrderClick}>
          Place an Order
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
