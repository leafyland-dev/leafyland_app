import React from 'react'
import db from '@/db/db'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CheckCircle2, MoreVertical, XCircle } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { formatPaisatoRupee } from '@/lib/formatter'
import { ActiveToggleDropdownItem } from './_components/SalesAction'

function AdminSalesPage() {
  return (<>
        {/* <div className="flex justify-between items-center gap-4">
            <PageHeader>Services</PageHeader>
            <Button asChild>
                <Link href="/admin/services/new">Add Service</Link>
            </Button>
        </div> */}
        <SalesTable/>
        </>
      
  )
}

async function SalesTable(){
    const sales = await db.placedOrder.findMany({
        select: {
            id:true,
            name:true,
            address: true,
            pinCode:true,
            city:true,
            state:true,
            productName: true,
            pricePaid: true,
            createdAt:true,
            outForDelivery:true
        },
        orderBy: {name: "asc"}
    })
    if(sales.length === 0) return <p>No Sales data</p>
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className='w-0'>
                        <span className='sr-only'>Out for Delivery</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead className="w-0">
                        <span className="sr-only"> Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {sales.map(sale => (
                    <TableRow key={sale.id}>
                        <TableCell>
                            {sale.outForDelivery ? (
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
                        <TableCell>{sale.name}</TableCell>
                        <TableCell>{sale.address},{sale.pinCode},{sale.city},{sale.state}</TableCell>
                        <TableCell>{sale.productName}</TableCell>
                        <TableCell>{formatPaisatoRupee(sale.pricePaid)}</TableCell>
                        <TableCell>{new Date(sale.createdAt).toLocaleDateString()}</TableCell>
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
                                        {/* <Link download href={`/admin/services/${sale.id}/edit`}>
                                            Edit
                                        </Link> */}
                                    </DropdownMenuItem>
                                    <ActiveToggleDropdownItem id={sale.id} outForDelivery = {sale.outForDelivery} />
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

export default AdminSalesPage