
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import db from "@/db/db";
import { Product } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Services } from "@/components/ServicesGrid";
import ServiceExample from "@/components/ServiceExample";
import serviceImg from '../../../public/serviceBg.jpeg'
import Image from "next/image";
import HeroSectionImg1 from "../../../public/LandingHeroSection/Carousel1.png"
import HeroSectionImg2 from "../../../public/LandingHeroSection/Carousel2.png"
import HeroSectionImg3 from "../../../public/LandingHeroSection/Carousel3.png"
import whatsapp from '../../../public/whatsapp.png'



import Autoplay from 'embla-carousel-autoplay'

import AutoCarousel from "@/components/AutoCarousel";


const HeroSectionImgs = [HeroSectionImg1, HeroSectionImg2, HeroSectionImg3]

function MostOrdered() {
  return db.product.findMany({
    where: { isAvailable: true },
    orderBy: { orders: { _count: "desc" } },
    take: 4
  })
}

function NewestProduct() {
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

export default async function HomePage() {

  return <>

    <main className="mx-[20px] lg:mx-[80px] flex-initial">
      {/* <ServiceBar title="Our Services" /> */}
      <ServiceExample />
      <ProductCategory title="Product Category" categoryFetcher={ProductByCategory} />
      <ProductGrid title="Suggested Fou You" productFetcher={MostOrdered} />
      <ProductGrid title="Newly Launched Products" productFetcher={NewestProduct} />
      <Link href='https://wa.me/919867909355'>
        <Image src={whatsapp} alt="icon"
          className="
        fixed
        w-[80px] h-[80px]
        shadow-lg
        rounded-full
        hover:shadow-xl
        transition-shadow duration-300
        cursor-pointer
        z-50
        bottom-4 right-4   // default position (mobile)
        md:bottom-9 md:right-6 // adjust for medium and up (desktop)
        lg:bottom-[80px] lg:left-[1800px]
        sm:left-1/2 sm:-translate-x-1/2 sm:bottom-4 // optional: center bottom on small screens
      "/>
      </Link>
    </main>

  </>
}

type ProductCategoryProps = {
  title: string,
  categoryFetcher: () => Promise<{ category: string | null, imagePath: string }[]>
}

async function ProductCategory({ categoryFetcher, title }: ProductCategoryProps) {
  const categories = await categoryFetcher();
  return (
    <div className=" space-y-3 my-10">
      <div className="flex gap-2 justify-center pb-[20px]">
        <h2 className="text-2xl lg:text-3xl font-bold">{title}</h2>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {categories.map((category, index) => (
          <Link href={`/${category.category}/full-category`} key={index} className="category-card text-center">
            {/* Circular image */}
            {/* <div className="w-16 h-16 mx-auto rounded-full overflow-hidden">
                { category.imagePath ? (
                  <img
                    src={category.imagePath}
                    alt={category.category ?? 'Category Image'}
                    className="w-full h-full object-cover"
                  />

                ): (
                  <Image
                    src={serviceImg}
                    alt={category.category ?? 'Category Image'}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                )}
              </div> */}
            <div className="w-[100px] h-[100px] lg:w-[140px] lg:h-[140px] mx-auto rounded-[10px] overflow-hidden border-[5px] border-yellow-400">
              <Image
                src={category.imagePath ? category.imagePath : serviceImg}
                alt={category.category ?? 'Category Image'}
                width={140}
                height={140}
                className="object-cover"
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
  productFetcher: () => Promise<Product[]>
}

async function ProductGrid({ productFetcher, title }: ProductGridProps) {
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
          <ProductCard key={product.id} {...product} />

        ))}
      </div>
    </div>
  </>
}

// async function ServiceBar({ title }: { title: string }) {
//   return (
//     <>
//       <div className="my-20 space-y-2">
//         <div className="flex gap-3">
//           <h2 className="text-2xl lg:text-3xl font-bold ">{title}</h2>
//           <Button variant={"outline"} className="space-x-2 text-xs lg:text-base" asChild>
//             <Link href={`/services`}>
//               <span>See more</span>
//               <ArrowRight className="size-3" />
//             </Link>
//           </Button>
//         </div>
//         <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8 gap-4">
//           {Services.map((service, index) => (
//             <div key={index} className="size-30 flex items-center space-x-4 p-2 border rounded-lg">
//               {service.icon}
//               <p className="text-xs lg:text-sm font-light  ">{service.name}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   )
// }

