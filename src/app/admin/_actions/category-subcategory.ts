"use server";

import db from "@/db/db";
import { z } from "zod";
import { redirect } from "next/navigation";

// Validation Schema
const categorySchema = z.object({
  category: z.string().min(1, "Category is required"),
});

const subCategorySchema = z.object({
  subCategory: z.string().min(1, "SubCategory is required"),
  categoryId: z.string().min(1, "Category ID is required"),
});

// Add Category
export async function addCategory(prevState: unknown, formData: FormData) {
  const entries = Object.fromEntries(formData.entries());
  const result = categorySchema.safeParse(entries);

  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const { category } = result.data;
  await db.serviceCategory.create({ data: { category } });

  redirect("/admin/services");
}

// Add SubCategory
export async function addSubCategory(prevState: unknown, formData: FormData) {
  const entries = Object.fromEntries(formData.entries());
  const result = subCategorySchema.safeParse(entries);

  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const { subCategory, categoryId } = result.data;

  await db.serviceSubCategory.create({
    data: {
      subCategory,
      categoryId,
    },
  });

  redirect("/admin/services");
}

// Fetch Categories with SubCategories
export async function getCategories() {
  return db.serviceCategory.findMany({
    include: { subCategories: true },
  });
}

// Delete Category
export async function deleteCategory(id: string) {
  await db.serviceCategory.delete({ where: { id } });
}

// Delete SubCategory
export async function deleteSubCategory(id: string) {
  await db.serviceSubCategory.delete({ where: { id } });
}
