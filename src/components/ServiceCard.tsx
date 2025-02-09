import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card'
import { Card, CardDescription, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { descriptionFormatter } from '@/lib/formatter'


type ServiceCardProps = {
    id: string,
    category: string,
    description: string,
    imagePath: string[]
}

export function ServiceCardRound({id, category, description, imagePath} : ServiceCardProps) {
  return (
    <>
      <Link href={`/services/${category}/full-category`} className='category-card text-center'>
      
      <div className="w-[100px] h-[100px] relative mx-auto">
              <Image src={imagePath[0]} fill alt={category}  className='w-full h-full object-cover rounded-full'
              />
          
      </div> 
      <h3 className="text-sm md:text-md lg:text-md mt-2">{category}</h3>
      </Link>
    </>
  )
}

export function ServiceCard ({id, category, description, imagePath}: ServiceCardProps){
  return <>
  
    <HoverCard>
    <Card className="flex overflow-hidden flex-col text-[#091f0f] " key={id}>
    <div className="relative w-full h-auto aspect-video m-3 ">
        <HoverCardTrigger>
            <Image src={imagePath[0]} fill alt={category}/>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4 bg-white">
          
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{category}</h4>
            <p className="text-sm">
              {description}
            </p>
            <div className="flex items-center pt-2">
            </div>
          </div>
        </div>
      </HoverCardContent>
        </div>
        <CardTitle className="text-lg lg:text:2xl m-2">{category}</CardTitle>
        
        <CardDescription className='m-2'>{descriptionFormatter(description)}...</CardDescription>
                    <Button >
                    <Link href={`/services/${id}/service-details`}>Read More</Link>

                    </Button>
    </Card>
    </HoverCard>

  </>
}

// export default ServiceCard