"use client";

import { createContext, ReactNode, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.util";

export interface ProductType {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
}

export interface CartItemType {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
}

export const addToCart = (
  cartItems: CartItemType[],
  productToAdd: ProductType
) => {
  const existingCartItems = cartItems.find(
    (item) => item.id === productToAdd.id
  );

  if (existingCartItems) {
    return cartItems.map((item) => {
      return item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item;
    });
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const removeItemFromCart = (
  cartItems: CartItemType[],
  productToRemove: ProductType
) => {
  const existingCartItems = cartItems.find(
    (item) => item.id === productToRemove.id
  ) as CartItemType;

  if (existingCartItems.quantity === 1) {
    return cartItems.filter((item) => item.id !== productToRemove.id);
  }

  return cartItems.map((item) => {
    return item.id === productToRemove.id
      ? { ...item, quantity: item.quantity - 1 }
      : item;
  });
};

export const clearCartItem = (
  cartItems: CartItemType[],
  cartItemToRemove: ProductType
) => {
  return cartItems.filter((item) => item.id !== cartItemToRemove.id);
};

const INITIAL_STATE = {
  cartCount: 0,
  isCartOpen: false,
  cartItems: [],
  cartTotal: 0,
};

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_CART_IS_OPEN: "SET_CART_IS_OPEN",
  RESET_CART: "RESET_CART",
};
export const cartReducer = (state: any, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.SET_CART_IS_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    case CART_ACTION_TYPES.RESET_CART:
      return INITIAL_STATE;
    default:
      throw new Error(`Unhandled action ${type} in user Reducer`);
  }
};
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: (t: boolean) => {},
  cartItems: [],
  addItemToCart: (item: CartItemType) => {},
  cartCount: 0,
  clearItemFromCart: (item: CartItemType) => {},
  removeItemsFromCart: (item: CartItemType) => {},
  cartTotal: 0,
  resetCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems: CartItemType[]) => {
    const newCount = newCartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const total = newCartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartTotal: total,
        cartCount: newCount,
      })
    );
  };
  const addItemToCart = (productToAdd: ProductType) => {
    const newCartItems = addToCart(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemsFromCart = (productToRemove: ProductType) => {
    const newCartItems = removeItemFromCart(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (productToClear: ProductType) => {
    const newCartItems = clearCartItem(cartItems, productToClear);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (bool: boolean) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_CART_IS_OPEN, bool));
  };

  const resetCart = () => {
    dispatch(createAction(CART_ACTION_TYPES.RESET_CART, null));
  };

  const value: any = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    clearItemFromCart,
    cartCount,
    cartTotal,
    addItemToCart,
    removeItemsFromCart,
    resetCart,
  };

  return (
    <CartContext.Provider value={value}> {children} </CartContext.Provider>
  );
};
