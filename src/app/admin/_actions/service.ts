"use server"

import db from "@/db/db";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";

// Define schema for validation
const addSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  imageUrls: z.array(z.string().url({ message: "Invalid image URL" })).optional(),
});

export async function addService(prevState: unknown, formData: FormData) {
  // Convert formData to an object and extract multiple image URLs
  const entries = Object.fromEntries(formData.entries());
  const imageUrls = Object.keys(entries)
    .filter((key) => key.startsWith("imagePath["))
    .map((key) => entries[key] as string);

  // Validate the form data with multiple image URLs
  const result = addSchema.safeParse({
    name: entries.name,
    description: entries.description,
    imageUrls,
  });

  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  console.log(data);

  // Store the service data in MongoDB using Prisma
  await db.service.create({
    data: {
      isAvailable: false,
      name: data.name,
      description: data.description,
      imagePath: data.imageUrls || [], // Store all the image URLs
    },
  });

  // Redirect after the service has been added
  redirect("/admin/services");
}


const editSchema = addSchema.extend({
  imageUrl: z.string().url({ message: "Invalid image URL" }).optional(),
});

// export async function updateService(
//   id: string,
//   prevState: unknown,
//   formData: FormData
// ) {
//   // Validate the form data
//   const result = editSchema.safeParse(Object.fromEntries(formData.entries()));

//   if (result.success === false) {
//     return result.error.formErrors.fieldErrors;
//   }

//   const data = result.data;
//   const service = await db.service.findUnique({ where: { id } });

//   if (service == null) return notFound();

//   // Update the service data in MongoDB using Prisma
//   await db.service.update({
//     where: { id },
//     data: {
//       name: data.name,
//       description: data.description,
//       imagePath: data.imageUrls || [], // Use the new image URL or keep the old one
//     },
//   });

//   // Redirect after the service has been updated
//   redirect("/admin/services");
// }

export async function updateService(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  // Extract multiple image URLs from formData
  const entries = Object.fromEntries(formData.entries());
  const newImageUrls = Object.keys(entries)
    .filter((key) => key.startsWith("imagePath["))
    .map((key) => entries[key] as string);

  // Find the existing service data
  const service = await db.service.findUnique({ where: { id } });
  if (service == null) return notFound();

  // Merge existing image URLs with new ones
  const combinedImageUrls = [
    ...(service.imagePath || []), // Existing image URLs
    ...newImageUrls, // New image URLs from formData
  ];

  // Validate the form data
  const result = editSchema.safeParse({
    ...entries,
    imageUrls: combinedImageUrls,
  });

  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  // Update the service data in MongoDB using Prisma
  await db.service.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      imagePath: data.imageUrls || [], // Store the merged image URLs
    },
  });

  // Redirect after the service has been updated
  redirect("/admin/services");
}



export async function toggleServiceAvailability(id: string, isAvailable: boolean){
  await db.service.update({where: {id}, data: {
      isAvailable
  }})
}

export async function deleteService(id: string){
  const service = await db.service.delete({where: { id }})
  if(service == null ) return notFound()
  
  // await fs.unlink(`public${product.imagePath}`)
}
