"use client";

import { Fragment } from "react";
import CategoryPreview from "../category-preview/category-preview";

const CategoriesPreview = ({ categories }: any) => {
  const categoriesMap = categories;
  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} products={products} title={title} />
        );
      })}
    </Fragment>
  );
};
export default CategoriesPreview;
