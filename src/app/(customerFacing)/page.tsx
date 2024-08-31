
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import db from "@/db/db";
import { Product } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Services } from "@/components/ServicesGrid";

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

export default async function HomePage(){
    return <>
    <main className="flex-initial">
        <ServiceBar title="Our Services" />
        <ProductGrid title="Suggested Fou You" productFetcher={MostOrdered}/>
        <ProductGrid title="Newly Launched Products" productFetcher={NewestProduct}/>
    </main>

    </>
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

