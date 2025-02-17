"use client";

import { useFormState } from "react-dom";
import {
  addCategory,
  addSubCategory,
  deleteCategory,
  getCategories,
} from "@/app/admin/_actions/category-subcategory";
import { useEffect, useState } from "react";

export default function CategoryPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [catError, addCategoryAction] = useFormState(addCategory, null);
  const [subError, addSubCategoryAction] = useFormState(addSubCategory, null);

  // Fetch categories on page load
  useEffect(() => {
    async function loadCategories() {
      const data = await getCategories();
      setCategories(data);
    }
    loadCategories();
  }, []);

  // Handle Category Deletion
  async function handleDeleteCategory(id: string) {
    await deleteCategory(id);
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  }

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Manage Categories & Subcategories</h1>

      {/* Add Category Form */}
      <form action={addCategoryAction} className="space-y-4">
        <h2 className="text-xl">Add Category</h2>
        <input
          type="text"
          name="category"
          placeholder="Category Name"
          required
          className="border p-2 w-full"
        />
        {catError?.category && (
          <p className="text-red-500">{catError.category[0]}</p>
        )}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Category
        </button>
      </form>

      {/* Add SubCategory Form */}
      <form action={addSubCategoryAction} className="space-y-4">
        <h2 className="text-xl">Add SubCategory</h2>
        <select
          name="categoryId"
          required
          className="border p-2 w-full"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.category}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="subCategory"
          placeholder="SubCategory Name"
          required
          className="border p-2 w-full"
        />
        {subError?.subCategory && (
          <p className="text-red-500">{subError.subCategory[0]}</p>
        )}
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Add SubCategory
        </button>
      </form>

      {/* Category & SubCategory List */}
      <div>
        <h2 className="text-xl mt-8 mb-4">Categories & SubCategories</h2>
        {categories.map((category) => (
          <div key={category.id} className="border p-4 mb-4">
            <div className="flex justify-between">
              <strong>{category.category}</strong>
              <button
                onClick={() => handleDeleteCategory(category.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
            {category.subCategories.map((sub: any) => (
              <p key={sub.id} className="ml-4">
                ↳ {sub.subCategory}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
