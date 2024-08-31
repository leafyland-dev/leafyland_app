

import React from 'react'
import { PageHeader } from '../_components/PageHeader'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import db from '@/db/db'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { serialize } from 'v8'
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { ActiveToggleDropdownItem, DeleteDropdownItem } from '../services/_components/ServiceAction'




function AdminServicePage() {
  return (<>
    <div className="flex justify-between items-center gap-4">
        <PageHeader>Services</PageHeader>
        <Button asChild>
            <Link href="/admin/services/new">Add Service</Link>
        </Button>
    </div>
    <ServiceTable/>
    </>
  )
}

async function ServiceTable(){
    const services = await db.service.findMany({
        select: {
            id: true,
            name: true,
            isAvailable: true
        },
        orderBy: { name: "asc"}
    })
    if(services.length === 0) return <p>No services found</p>
    return(
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-0">
                        <span className="sr-only"> Available For Purchase</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    {/* <TableHead>Price</TableHead>
                    <TableHead>Order</TableHead> */}
                    <TableHead className="w-0">
                        <span className="sr-only"> Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {services.map(service => (
                    <TableRow key={service.id}>
                        <TableCell>
                            {service.isAvailable ? (
                                <>
                                    <span className="sr-only">Available</span>
                                    <CheckCircle2/>
                                </>
                            ): (
                                <>
                                    <span className="sr-only">Unavailable</span>
                                    <XCircle className="stroke-destructive"/>
                                </>
                            )}
                        </TableCell>
                        <TableCell>{service.name}</TableCell>
                        {/* <TableCell>{formatCurrency(product.price)}</TableCell>
                        <TableCell>{formatNumber(product._count.orders)}</TableCell> */}
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <MoreVertical />
                                    <span className="sr-only"> Actions</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {/* <DropdownMenuItem asChild>
                                        <a download href={`/admin/products/${product.id}/download`}>
                                            Download
                                        </a>
                                    </DropdownMenuItem> */}
                                    <DropdownMenuItem asChild>
                                        <Link download href={`/admin/services/${service.id}/edit`}>
                                            Edit
                                        </Link>
                                    </DropdownMenuItem>
                                    <ActiveToggleDropdownItem id={service.id} isAvailable = {service.isAvailable} />
                                    <DropdownMenuSeparator/>
                                    {/* <DeleteDropdownItem id={service.id} disabled= {service._count.orders > 0}/> */}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default AdminServicePage