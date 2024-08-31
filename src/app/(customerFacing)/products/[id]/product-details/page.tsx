import { ProductCard } from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import prisma from "@/db/db"
import { formatCurrency } from "@/lib/formatter"
import { Product } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import {auth, signIn, signOut } from "@/auth"




export default async function ProductDetails({ params: {id}}: {params: {id: string}}){
    const allProduct = await prisma.product.findUnique({
        where: {id} 
    })
    if (!allProduct) {
        return <div>Product not found</div>;
      }
    return <>
        <ProductDetailsPage allProduct={allProduct}/>
    </>
}



async function ProductDetailsPage( {allProduct}: {allProduct: Product}){
    const session = await auth()
    return <>
    {allProduct? (

        <section>
                
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="aspect-video">
                    <Image src={allProduct.imagePath}  alt={allProduct.name} width={600} height={450}  />
                </div>    
                <div>
                    <h1 className="text-4xl font-bold mb-4 text-slate-600">{allProduct.name}</h1>
                    <p className="text-2xl font-bold text-green-500 mb-4">{formatCurrency(allProduct.price)}</p>
                    <p className="text-slate-500 mb-8"> {allProduct.description}</p>
                        {
                         session?.user ?(
                                <Button className="w-full bg-green-800">
                                <Link href={`/products/${allProduct.id}/product-details/checkout/?amount=${allProduct.price}&name=${encodeURIComponent(allProduct.name)}`} className="w-full">BUY NOW</Link>
                                </Button>
                        ):(
                                <Button className="w-full bg-green-800">
                                {/* <Link href={"/api/auth/signin"} className="w-full">
                                BUY NOW
                                </Link> */}
                                <Link href={`/products/${allProduct.id}/product-details/checkout/?amount=${allProduct.price}&name=${encodeURIComponent(allProduct.name)}`} className="w-full">BUY NOW</Link>
                                </Button>
                            )
                        }
                    <Button className="w-full bg-white-800 text-slate-900 border-3 border-indigo-500/100 hover:text-neutral-50 ">
                        <Link href={`/products/${allProduct.id}/product-details/cart`}className="w-full">ADD TO CART</Link>
                    </Button>
                </div>
            </div>
            
        </section>
    ):(
        <div>Not found</div>
    )}
    <div className="mt-6">
        <h1 className="text-2xl lg:text-3xl font-bold mb-6">CUSTOMERS ALSO BUY </h1>
        <ProductGrid productFetcher={getProducts}/>
    </div>

    </>
}

function getProducts(){
    return prisma.product.findMany({
        where: { isAvailable: true},
    })
}

type ProductGridProps = {
    productFetcher: ()=> Promise<Product[]>
}

async function ProductGrid( { productFetcher} : ProductGridProps ){
    return <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {(await productFetcher()).map(product => (
            <ProductCard key= {product.id} {...product} />
        ))}
    </div>
    </>
}