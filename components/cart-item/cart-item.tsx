import { CartItemType } from "@/contexts/cart.context";
import styles from "./cart-item.module.css";

const CartItem = ({ cartItem }: { cartItem: CartItemType }) => {
  const { name, price, imageUrl, quantity } = cartItem;
  return (
    <div className={styles["cart-item-container"]}>
      <img src={imageUrl} alt={`${name}`} className={styles.img} />
      <div className={styles["item-details"]}>
        <span className={styles.name}>{name}</span>
        <span className={styles.price}>
          {quantity} x {price}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
