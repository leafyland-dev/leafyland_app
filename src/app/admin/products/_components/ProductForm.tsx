"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { addProduct, updateProduct } from "../../_actions/products"
import { Textarea } from "@/components/ui/textarea"
import { useFormState, useFormStatus } from "react-dom"
import { Product } from "@prisma/client"
import Image from "next/image"

// For Edge Store
import * as React from 'react';
import { useEdgeStore } from "@/lib/edgestore"


const productCategory = [
    "Indoor Plants",
    "Flowering Plants",
    "Low Maintenance Plants",
    "Air Purifying Plants",
    "Low Light Plants",
    "Cacti and Succulents",
    "Hanging Plants",
    "Medicinal & Aromatic Plants",
    "Pet-Friendly Plants",
    "Fruit Plants",
    "Bundles",
    "New Arrivals",
    "Flowering Plant",
    "Money Plants",
    "Snake Plants",
    "Jade Plants",
    "Lucky Bamboo plants",
    "Areca Palm",
    "Hoya Plants",
    "Oxygen plants",
    "Herb plants",
    "Palm Plants",
    "Aralia Plants",
    "Lucky Plants",
    "Dracaena Plants",
    "Vastu PlantI"
]

export function ProductForm({ product }: { product?: Product | null }) {

    const [selectedCategory, setSelectedCategory] = useState(product?.category || "")
    const [error, action] = useFormState(product == null ? addProduct : updateProduct.bind(null, product.id), {})
    const [price, setPrice] = useState<number | undefined>(product?.price)

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);

    };


    return <form action={action} className="space-y-8">
        <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input type="text" id="name" name="name" required defaultValue={product?.name || ""} />
            {error.name && <div className="text-destructive"> {error.name}</div>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="category">Product Category</Label>
            <select
                id="category"
                name="category"
                required
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="border p-2 rounded w-full"
            >
                <option value="">Select a category</option>
                {productCategory.map((category, index) => (
                    <option key={index} value={category} >{category}</option>
                ))}
            </select>

            {/* {error?.name && <div className="text-destructive"> {error.name}</div>} */}
        </div>

        <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
                type="number"
                id="price"
                name="price"
                required
                value={price}
                onChange={e => setPrice(Number(e.target.value) || undefined)} />
            {error.price && <div className="text-destructive"> {error.price}</div>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" required defaultValue={product?.description} />
            {error.description && <div className="text-destructive"> {error.description}</div>}

        </div>
        <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <Input type="file" id="image" name="image" required={product == null} />
            {product != null && (
                <Image src={product.imagePath} height={400} width={400} alt="Product Image" />
            )}
            {error.image && <div className="text-destructive"> {error.image}</div>}
        </div>
        <SubmitButton />
    </form>
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return <Button type="submit" disabled={pending}>{pending ? "Saving..." : "Save"}</Button>
}