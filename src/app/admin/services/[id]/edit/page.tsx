

import { PageHeader } from "@/app/admin/_components/PageHeader";
import { ServiceForm } from "../../_components/ServiceForm";
import db from "@/db/db";


export default async function NewServicePage({params: {id}} : {params: {id: string}}){
    const service = await db.service.findUnique( {where: {id} } )
    return(
        <>
            <PageHeader>Add Service</PageHeader>
            <ServiceForm service={service}/>
        </>
    )
}