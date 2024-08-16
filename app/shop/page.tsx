import CategoriesPreview from "@/components/categories-preview";
import { getCategoriesAndDocuments } from "@/utils/firebase/firebase.util";
import React from "react";

async function fetchCategory() {
  const categoryMap = await getCategoriesAndDocuments();

  return categoryMap;
}

export default async function Category() {
  const data = await fetchCategory();
  return (
    <>
      <CategoriesPreview categories={data} />
    </>
  );
}
