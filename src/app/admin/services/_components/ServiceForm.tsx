

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
  // const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState(service?.category || "")
  // const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState(service?.subCategory || "")

  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const { edgestore } = useEdgeStore();
  const [error, action] = useFormState(service == null ? addService : updateService.bind(null, service.id), {});
  // const [name, setName] = useState(service?.name || "");
  const [description, setDescription] = useState(service?.description || "");
  const [imagePaths, setImagePaths] = useState<string[]>(service?.imagePath ? service.imagePath : []);

  const [abortController, setAbortController] = useState<AbortController>();
  const [isCancelled, setIsCancelled] = useState(false);



  function updateFileProgress(key: string, progress: FileState['progress']) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key,
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  if (isCancelled) {
    return <><div className="flex flex-col items-center m-6">CANCELLED!!!</div>
      <Link href={"/admin/services"} className="flex felx-col items-center m-6">Click to go back</Link>
    </>

  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("category", selectedCategory);
    formData.append("subCategory", selectedSubCategory);
    formData.append("description", description);
    imagePaths.forEach((url, index) => {
      formData.append(`imagePath[${index}]`, url);
    });

    // Call action with the FormData object
    action(formData);
    console.log('Submitted form data:', Object.fromEntries(formData.entries()));
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

      <MultiImageDropzone
        value={fileStates}
        dropzoneOptions={{
          maxFiles: 6,
        }}
        onChange={(files) => {
          setFileStates(files);
        }}
        onFilesAdded={async (addedFiles) => {
          setFileStates([...fileStates, ...addedFiles]);
          await Promise.all(
            addedFiles.map(async (addedFileState, index) => {
              try {
                const oldFileUrl = imagePaths[index] || null;

                // Ensure that addedFileState.file is of type File
                if (!(addedFileState.file instanceof File)) {
                  throw new Error("Expected a File object");
                }

                const abortController = new AbortController();

                const res = await edgestore.publicFiles.upload({
                  file: addedFileState.file,
                  options: {
                    temporary: true,
                  },
                  signal: abortController.signal,
                  onProgressChange: async (progress) => {
                    updateFileProgress(addedFileState.key, progress);
                    if (progress === 100) {
                      // wait 1 second to set it to complete
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      updateFileProgress(addedFileState.key, 'COMPLETE');
                    }
                  },
                });
                console.log(res);
                setImagePaths((prev) => {
                  const newImagePaths = [...prev];
                  if (oldFileUrl) {
                    newImagePaths[index] = res.url;
                  } else {
                    newImagePaths.push(res.url);
                  }
                  return newImagePaths;
                });
              } catch (err) {
                updateFileProgress(addedFileState.key, 'ERROR');
              }
            }),
          );
        }}
      />
      {/* {service != null && (
        <Image src={service.imagePath[0]} height={400} width={400} alt="Service image"/>
      )} */}
      <div className="image-gallery">
        {service?.imagePath && service.imagePath.length > 0 ? (
          service.imagePath.map((url, index) => (
            <Image
              key={index}
              src={url}
              height={400}
              width={400}
              alt={`Service image ${index + 1}`}
              className="mb-4" // Add any additional styling you want
            />
          ))
        ) : (
          <p>No images available</p>
        )}

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



