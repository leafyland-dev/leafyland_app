
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import db from "@/db/db";
import { Product } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Services } from "@/components/ServicesGrid";
import ServiceExample from "@/components/ServiceExample";

function MostOrdered(){
    return db.product.findMany({
        where: { isAvailable: true},
        orderBy: { orders: {_count: "desc"}},
        take: 4
    })
}

function NewestProduct(){
    return db.product.findMany({
        where: { isAvailable: true },
        orderBy: { createdAt: "desc" },
        take: 4
    })
}

function ProductByCategory() {
    return db.product.findMany({
      distinct: ['category'], // Get distinct categories
      orderBy: {
        createdAt: 'asc', // Get the first product by createdAt
      },
      select: {
        category: true,
        imagePath: true, // Get image path of the first product in the category
      },
      where: {
        category: {
          not: null, // Ensure we only get products with a category
        },
      },
    });
  }

export default async function HomePage(){
    return <>
    <main className="flex-initial">
        {/* <ServiceBar title="Our Services" /> */}
        <ServiceExample/>
        <ProductCategory title="Product Category" categoryFetcher={ProductByCategory}/>
        <ProductGrid title="Suggested Fou You" productFetcher={MostOrdered}/>
        <ProductGrid title="Newly Launched Products" productFetcher={NewestProduct}/>
    </main>

    </>
}

type ProductCategoryProps = {
    title: string,
    categoryFetcher: ()=> Promise<{category: string | null, imagePath: string }[]>
}

async function ProductCategory({ categoryFetcher, title }: ProductCategoryProps) {
    const categories = await categoryFetcher();
    return (
      <div className=" space-y-3 my-10">
        <div className="flex gap-2">
          <h2 className="text-2xl lg:text-3xl font-bold">{title}</h2>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {categories.map((category, index) => (
            <Link href={`/${category.category }/full-category`} key={index} className="category-card text-center">
              {/* Circular image */}
              <div className="w-16 h-16 mx-auto rounded-full overflow-hidden">
                <img
                  src={category.imagePath}
                  alt={category.category ?? 'Category Image'}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Category name */}
              <h3 className="text-lg font-medium mt-2">{category.category}</h3>
            </Link>
          ))}
        </div>
      </div>
    );
  }
  

type ProductGridProps = {
    title: string,
    productFetcher: ()=> Promise<Product[]>
}

async function ProductGrid({ productFetcher, title}: ProductGridProps){
    return <>
        <div className="mb-6 space-y-3 ">
            <div className="flex gap-3">
                <h2 className="text-2xl lg:text-3xl  font-bold ">{title}</h2>
            <Button variant={"outline"} className="space-x-2" asChild>
                <Link href={`/products`}>
                    <span>See more</span>
                    <ArrowRight className="size-3" />
                </Link>
            </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {(await productFetcher()).map(product => (
                    <ProductCard key={product.id} {...product}/>

                ))}
            </div>
        </div>
    </>
}

async function ServiceBar({title}: {title: string}){
    return(
        <>
          <div className="my-20 space-y-2">
            <div className="flex gap-3">
                    <h2 className="text-2xl lg:text-3xl font-bold ">{title}</h2>
                <Button variant={"outline"} className="space-x-2 text-xs lg:text-base" asChild>
                    <Link href={`/services`}>
                        <span>See more</span>
                        <ArrowRight className="size-3" />
                    </Link>
                </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8 gap-4">
                    {Services.map((service, index) => (
                    <div key={index} className="size-30 flex items-center space-x-4 p-2 border rounded-lg">
                        {service.icon}
                        <p className="text-xs lg:text-sm font-light  ">{service.name}</p>
                    </div>
                    ))}
                </div>
            </div>  
        </>
    )
}

