"use client";

import Link from "next/link";
import React, { useContext } from "react";
import { UserContext } from "../../contexts/user.contexts";
import { CartContext } from "../../contexts/cart.context";
import { signOutUser } from "@/utils/firebase/firebase.util";
import CartIcon from "../cart-icon";
import CartDropdown from "../cart-dropdown";
import styles from "./Navigation.module.css";
import crwnImg from "../../public/crown.svg";
import Image from "next/image";

export default function Navigation() {
  const { currentUser }: any = useContext(UserContext);

  const { isCartOpen } = useContext(CartContext);
  return (
    <>
      <div className={styles.navigation}>
        <Link className={styles["logo-container"]} href="/">
          <Image src={crwnImg} width={50} height={40} alt="logo" />
        </Link>
        <div className={styles["nav-links-container"]}>
          <Link className={styles["nav-link"]} href="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <>
              <span className={styles["nav-link"]} onClick={signOutUser}>
                SIGN OUT
              </span>

              <span>
                {currentUser.displayName?.split(" ")[0]?.toUpperCase() || ""}
              </span>
            </>
          ) : (
            <Link className={styles["nav-link"]} href="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
    </>
  );
}
