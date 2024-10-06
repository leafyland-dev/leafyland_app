
import { Service } from '@prisma/client'
import React from 'react'
import  { ServiceCardRound } from './ServiceCard'
import db from '@/db/db'


async function getServices(){
    return db.service.findMany({
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
        <>
        <div className=' space-y-2 my-10'> 
        <h2 className='text-2xl lg:text-3xl font-bold'>Our Services</h2>
        <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-6 place-items-center ">
            {services.map((service) => (
                <ServiceCardRound key={service.id} {...service} />
            ))}
        </div>
        </div>
        
        </>
    );
}

export default ServiceExample