
import { ProductCard } from "@/components/ProductCard";
import prisma from "@/db/db";
import { Product } from "@prisma/client";
import { notFound } from "next/navigation";
import Pagination from "@/components/Pagination";


// Function to fetch products based on the search query
// Function to fetch products with pagination
async function getProducts(searchQuery: string | null, page: number, pageSize: number) {
    const skip = (page - 1) * pageSize; // Calculate items to skip based on the page number

    if (searchQuery) {
        return prisma.product.findMany({
            where: {
                isAvailable: true,
                OR: [
                    { name: { contains: searchQuery, mode: 'insensitive' } },
                    { description: { contains: searchQuery, mode: 'insensitive' } },
                ],
            },
            skip,
            take: pageSize, // Limit the number of items
        });
    } else {
        return prisma.product.findMany({
            where: { isAvailable: true },
            skip,
            take: pageSize,
        });
    }
}


// Server-side component to fetch products
export default async function Products({ searchParams }: { searchParams: { q?: string; page?: string } }) {
    const searchQuery = searchParams.q ?? null;
    const page = parseInt(searchParams.page ?? "1", 10); // Default to page 1 if not provided
    const pageSize = 20; // Items per page

    const products = await getProducts(searchQuery, page, pageSize);

    if (!products || products.length === 0) {
        notFound(); // Handles the case where no products are found
    }

    return (
        <>
            <ProductGrid products={products} />
            <Pagination currentPage={page} hasMore={products.length === pageSize} searchQuery={searchQuery} />
        </>
    );
}


type ProductGridProps = {
    products: Product[];
};

// Component to render the product grid
function ProductGrid({ products }: ProductGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-[20px] md:px-[30px] lg:px-[64px]">
            {products.map((product) => (
                <ProductCard key={product.id} {...product} />
            ))}
        </div>
    );
}
