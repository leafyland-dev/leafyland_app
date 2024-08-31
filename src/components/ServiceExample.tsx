import prisma from '@/db/db'
import { Service } from '@prisma/client'
import React from 'react'
import ServiceCard from './ServiceCard'


async function getServices(){
    return prisma.service.findMany({
        where: {isAvailable: true}
    })
}
async function ServiceExample() {

    const allServices = await getServices()

  return (
    <>
        <ServiceGrid services = {allServices}/>
    </>
  )
}

type ServiceGridProps = {
    services : Service[]
}

// Component to render the product grid
function ServiceGrid({ services }: ServiceGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
                <ServiceCard key={service.id} {...service} />
            ))}
        </div>
    );
}

export default ServiceExample