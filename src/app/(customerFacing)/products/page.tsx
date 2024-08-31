
import { ProductCard } from "@/components/ProductCard";
import prisma from "@/db/db";
import { Product } from "@prisma/client";
import { notFound } from "next/navigation";

// Function to fetch products based on the search query
async function getProducts(searchQuery: string | null) {
    if (searchQuery) {
        return prisma.product.findMany({
            where: {
                isAvailable: true,
                OR: [
                    { name: { contains: searchQuery, mode: 'insensitive' } },
                    { description: { contains: searchQuery, mode: 'insensitive' } },
                ],
            },
        });
    } else {
        return prisma.product.findMany({
            where: { isAvailable: true },
        });
    }
}

// Server-side component to fetch products
export default async function Products({ searchParams }: { searchParams: { q?: string } }) {
    const searchQuery = searchParams.q ?? null;
    const products = await getProducts(searchQuery);

    if (!products) {
        notFound(); // Handles the case where no products are found
    }

    return (
        <>
            <ProductGrid products={products} />
        </>
    );
}

type ProductGridProps = {
    products: Product[];
};

// Component to render the product grid
function ProductGrid({ products }: ProductGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
                <ProductCard key={product.id} {...product} />
            ))}
        </div>
    );
}
