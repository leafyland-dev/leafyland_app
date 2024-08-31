

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

export function ServiceForm({ service }: { service?: Service | null }) {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const { edgestore } = useEdgeStore();
  const [error, action] = useFormState(service == null ? addService : updateService.bind(null, service.id), {});
  const [name, setName] = useState(service?.name || "");
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
    formData.append("name", name);
    formData.append("description", description);
    imagePaths.forEach((url, index) => {
      formData.append(`imagePath[${index}]`, url);
    });

    // Call action with the FormData object
    action(formData);
    console.log('Submitted form data:', Object.fromEntries(formData.entries()));
  };

  function abortFunc(){
    abortController?.abort();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input 
          type="text" 
          id="name" 
          name="name" 
          required 
          value={name}
          onChange={(e) => setName(e.target.value)} 
        />
        {error?.name && <div className="text-destructive"> {error.name}</div>}
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
      <Button className="mx-4" onClick={()=> {
        setTimeout(() => {
          setIsCancelled(true)
        }, 100);
        redirect("/admin/services/")
        }}>Cancel</Button>
    </form>
  );
}



