"use client";

import Link from "next/link";
import styles from "./category-preview.module.css";
import ProductCard from "../product-card";
import { CartItemType, ProductType } from "@/contexts/cart.context";
const CategoryPreview = ({
  title,
  products,
}: {
  title: string;
  products: ProductType[];
}) => {
  return (
    <div className={styles["category-preview-container"]}>
      <h2>
        <Link className={styles.title} href={`shop/${title}`}>
          {title.toUpperCase()}
        </Link>
      </h2>
      <div className={styles.preview}>
        {products
          .filter((_, index) => index < 4)
          .map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
