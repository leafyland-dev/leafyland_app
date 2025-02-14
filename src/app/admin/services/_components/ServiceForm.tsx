

"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useState } from "react";
import { useEdgeStore } from '@/lib/edgestore';
import * as React from 'react';
import { addService, updateService } from "../../_actions/service";
import { Service } from "@prisma/client";
import { useFormState } from "react-dom";
import { type FileState, MultiImageDropzone } from "@/components/MultiImageDropZone";
import { redirect } from "next/navigation";
import Link from "next/link";
// import { uploadImageToFirebase } from "@/lib/utils/uploadImage";
import CloudinaryUploader from "@/components/CloudinaryUploader";

const serviceNames = [
  ["Landscape Design & Planning", [
    "Conceptual landscape design",
    "Garden architecture & urban planning",
    "Site analysis & environmental impact assessment",
    "Sustainable landscape solutions"
  ]],
  ["Landscape Construction & Installation", [
    "Hardscaping (patios, walkways, driveways, retaining walls)",
    "Softscaping (lawns, plants, trees, shrubs, flower beds)",
    "Water features (ponds, fountains, waterfalls)",
    "Irrigation & drainage systems",
    "Outdoor lighting installation",
    "Rooftop & vertical gardens"
  ]],
  ["Garden & Park Maintenance", [
    "Lawn care (mowing, fertilization, aeration)",
    "Pruning & tree care",
    "Seasonal planting & garden bed maintenance",
    "Weed & pest control",
    "Green waste recycling & composting"
  ]],
  ["Sustainable & Eco-Friendly Landscaping", [
    "Native & drought-resistant planting",
    "Rainwater harvesting systems",
    "Green roofs & living walls",
    "Carbon offset landscape projects",
    "Organic gardening & permaculture design"
  ]],
  ["Urban Landscaping & Public Space Development", [
    "Park & recreational area development",
    "Smart city greening projects",
    "Street tree planting & urban forestry",
    "Community garden projects"
  ]],
  ["Commercial & Industrial Landscaping", [
    "Office & corporate campus landscaping",
    "Hotel & resort garden design",
    "Shopping mall & retail space greening",
    "Industrial estate beautification"
  ]],
  ["Specialty Landscaping Services", [
    "Japanese & Zen gardens",
    "English & French formal gardens",
    "Mediterranean & xeriscape gardens",
    "Historic garden restoration"
  ]]
]


export function ServiceForm({ service }: { service?: Service | null }) {
  const [selectedCategory, setSelectedCategory] = useState(service?.category || "")
  const [selectedSubCategory, setSelectedSubCategory] = useState(service?.subCategory || "")

  const { edgestore } = useEdgeStore();
  const [error, action] = useFormState(service == null ? addService : updateService.bind(null, service.id), {});
  // const [name, setName] = useState(service?.name || "");
  const [description, setDescription] = useState(service?.description || "");

  const [abortController, setAbortController] = useState<AbortController>();
  const [isCancelled, setIsCancelled] = useState(false);

  const [imageUrls, setImageUrls] = useState<string[]>([]);

  // Cloudinary integration

  const handleUploadSuccess = (urls: string[]) => {
    setImageUrls((prev) => [...prev, ...urls]); // Append new URLs
    // console.log(imageUrls)
  };
  // Log whenever imageUrls updates
  React.useEffect(() => {
    console.log("Updated Image URLs:", imageUrls);
  }, [imageUrls]);


  // function updateFileProgress(key: string, progress: FileState['progress']) {
  //   setFileStates((fileStates) => {
  //     const newFileStates = structuredClone(fileStates);
  //     const fileState = newFileStates.find(
  //       (fileState) => fileState.key === key,
  //     );
  //     if (fileState) {
  //       fileState.progress = progress;
  //     }
  //     return newFileStates;
  //   });
  // }

  if (isCancelled) {
    return <><div className="flex flex-col items-center m-6">CANCELLED!!!</div>
      <Link href={"/admin/services"} className="flex felx-col items-center m-6">Click to go back</Link>
    </>

  }



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Image URLs before submission:", imageUrls); // Debugging

    try {
      const formData = new FormData();
      formData.append("category", selectedCategory);
      formData.append("subCategory", selectedSubCategory);
      formData.append("description", description);

      // Append image URLs to formData
      imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });

      // Call action with the FormData object
      await action(formData);

      console.log("Submitted form data:", Object.fromEntries(formData.entries()));
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };



  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setSelectedSubCategory(""); // Reset sub-category selection when category changes
  };

  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubCategory(e.target.value);
  };

  const subCategories = (serviceNames.find(([category]) => category === selectedCategory)?.[1] ?? []) as string[];


  function abortFunc() {
    abortController?.abort();
  }





  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="category">Service Category</Label>
        <select
          id="category"
          name="category"
          required
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border p-2 rounded w-full"
        >
          <option value="">Select a category</option>
          {serviceNames.map(([category], index) => (
            <option key={index} value={category} >{category}</option>
          ))}
        </select>

        {/* {error?.name && <div className="text-destructive"> {error.name}</div>} */}
      </div>

      <div className="space-y-2">
        <Label htmlFor="subCategory">Sub-service</Label>
        <select
          id="subCategory"
          name="subCategory"
          required
          value={selectedSubCategory}
          onChange={handleSubCategoryChange}
          className="border p-2 rounded w-full"
          disabled={!selectedCategory}
        >
          <option value="">Select a sub-service</option>
          {subCategories.map((sub, index) => (
            <option key={index} value={sub}>{sub}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {error?.description && <div className="text-destructive"> {error.description}</div>}
      </div>


      {/* Cloudinary Image uploader */}
      <CloudinaryUploader onUploadSuccess={handleUploadSuccess} />
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Uploaded Images:</h3>
        <div className="grid grid-cols-3 gap-4 mt-2 mb-[10px]">
          {imageUrls.map((url, index) => (
            <img key={index} src={url} alt="Uploaded" className="w-32 h-32 object-cover rounded" />
          ))}
        </div>
      </div>

      <Button type="submit">
        Submit
      </Button>
      <Button className="mx-4" onClick={() => {
        setTimeout(() => {
          setIsCancelled(true)
        }, 100);
        redirect("/admin/services/")
      }}>Cancel</Button>
    </form>
  );
}



