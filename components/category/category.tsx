"use client";

import { Fragment, useContext, useEffect, useState } from "react";
import styles from "./category.module.css";
import { CategoriesContext } from "../../contexts/categories.context";

import { useParams } from "next/navigation";
import ProductCard from "../product-card";
import { ProductType } from "@/contexts/cart.context";

interface CategoriesMap {
  [key: string]: ProductType[];
}

const Category = () => {
  const { category }: { category: string } = useParams();
  const { categoriesMap } = useContext(CategoriesContext) as {
    categoriesMap: CategoriesMap;
  };
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className={styles["category-title"]}>{category.toUpperCase()}</h2>
      <div className={styles["category-container"]}>
        {products &&
          products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </Fragment>
  );
};

export default Category;
