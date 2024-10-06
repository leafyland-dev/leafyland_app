import { ServiceCard } from '@/components/ServiceCard'
import db from '@/db/db'
import { Service } from '@prisma/client'
import React from 'react'

async function ServiceCategory({ params: {category }}: {params: {category: string}}) {
    const serviceInCategory = await db.service.findMany({
        where: {category}
    })
    console.log('service in category', serviceInCategory)
    
    if(!serviceInCategory || serviceInCategory.length == 0){
        return <div>Category not found</div>
    }
  return (
    <CategoryDetails services = {serviceInCategory}/>
  )
}

type CategoryDetialsProps = {
    services: Service[]
}

async function CategoryDetails( {services}: CategoryDetialsProps){
    return<>
        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {services.map(service => (
                <ServiceCard key={service.id} {...service}/>
            ))}
        </div>
    </>
}

export default ServiceCategory