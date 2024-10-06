import { ProductCard } from '@/components/ProductCard'
import prisma from '@/db/db'
import { Product } from '@prisma/client'
import React from 'react'

async function FullCategory({ params: {category}} : {params: {category: string}}) {
    const productsInCategory = await prisma.product.findMany({
        where: {category}
    })
    console.log('product in category', productsInCategory)
    if(!productsInCategory || productsInCategory.length == 0){
        return <div>Category not found</div>
    }
  return (
    <CategoryDetials products={productsInCategory}/>
  )
}

type CategoryDetialsProps = {
    products : Product[]
}

async function CategoryDetials( {products}: CategoryDetialsProps){
    return <>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* {(await productFetcher()).map(product => (
                    <ProductCard key={product.id} {...product}/>

                ))} */}
                {products.map(product => (

                    <ProductCard key={product.id} {...product}/>
                ))

                }
            </div>
        
    </>
}

export default FullCategory