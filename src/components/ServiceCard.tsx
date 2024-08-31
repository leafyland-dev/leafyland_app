import React from 'react'
import { Card, CardDescription, CardFooter, CardTitle } from './ui/card'
import Image from 'next/image'
import { descriptionFormatter } from '@/lib/formatter'
import { Button } from './ui/button'
import Link from 'next/link'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@radix-ui/react-hover-card'
import { CalendarIcon } from 'lucide-react'

type ServiceCardProps = {
    id: string,
    name: string,
    description: string,
    imagePath: string[]
}

function ServiceCard({id, name, description, imagePath} : ServiceCardProps) {
  return (
    <>
    <HoverCard>
    <Card className="flex overflow-hidden flex-col text-[#091f0f] " key={id}>
    <div className="relative w-full h-auto aspect-video m-3 ">
        <HoverCardTrigger>
            <Image src={imagePath[0]} fill alt={name}/>
        </HoverCardTrigger>
        {/* <HoverCardContent >
            <div className='relative w-full h-auto aspect-video m-3'>
            <Image src={imagePath[1]} width={400} height={400} alt={name}/>

            </div>
        </HoverCardContent> */}
        <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4 bg-white">
          
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{name}</h4>
            <p className="text-sm">
              {description}
            </p>
            <div className="flex items-center pt-2">
              {/* <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span> */}
            </div>
          </div>
        </div>
      </HoverCardContent>
        </div>
        <CardTitle className="text-lg lg:text:2xl m-2">{name}</CardTitle>
        
        <CardDescription className='m-2'>{descriptionFormatter(description)}...</CardDescription>
        {/* <CardFooter> */}
                    <Button >
                    <Link href={`/services/${id}/service-details`}>Read More</Link>

                    </Button>
                {/* </CardFooter> */}
    </Card>
    </HoverCard>
    </>
  )
}

export default ServiceCard