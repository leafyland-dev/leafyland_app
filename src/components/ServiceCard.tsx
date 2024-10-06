import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card'
import { Card, CardDescription, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { descriptionFormatter } from '@/lib/formatter'


type ServiceCardProps = {
    id: string,
    name: string,
    description: string,
    imagePath: string[]
}

export function ServiceCardRound({id, name, description, imagePath} : ServiceCardProps) {
  return (
    <>
      <Link href={`/services/${name}/full-category`} className='category-card text-center'>
      
      <div className="w-16 h-16 relative mx-auto">
              <Image src={imagePath[0]} fill alt={name}  className='w-full h-full object-cover rounded-full'
              />
          
      </div> 
      <h3 className="text-sm md:text-md lg:text-md mt-2">{name}</h3>
      </Link>
    </>
  )
}

export function ServiceCard ({id, name, description, imagePath}: ServiceCardProps){
  return <>
  
    <HoverCard>
    <Card className="flex overflow-hidden flex-col text-[#091f0f] " key={id}>
    <div className="relative w-full h-auto aspect-video m-3 ">
        <HoverCardTrigger>
            <Image src={imagePath[0]} fill alt={name}/>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4 bg-white">
          
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{name}</h4>
            <p className="text-sm">
              {description}
            </p>
            <div className="flex items-center pt-2">
            </div>
          </div>
        </div>
      </HoverCardContent>
        </div>
        <CardTitle className="text-lg lg:text:2xl m-2">{name}</CardTitle>
        
        <CardDescription className='m-2'>{descriptionFormatter(description)}...</CardDescription>
                    <Button >
                    <Link href={`/services/${id}/service-details`}>Read More</Link>

                    </Button>
    </Card>
    </HoverCard>

  </>
}

// export default ServiceCard