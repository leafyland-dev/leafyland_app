import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import db from '@/db/db'
import React from 'react'
import { MoreVertical } from 'lucide-react'
import { DeleteDropdownItem } from './_components/CustomerActions'

function AdminCustomerPage() {
  return (<>
  
  <CustomerTable/>
  </>
  )
}

async function CustomerTable(){
    const users = await db.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            phone: true
        },
        orderBy: {name: "asc"}
    })
    if(users.length === 0) return <p>No users data found</p>
    return(
        <Table>
            <TableHeader>
                <TableHead> Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className='w-0'>
                    <span className='sr-only'>Actions</span>
                </TableHead>
            </TableHeader>
            <TableBody>
                {users.map(user => (
                    <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone}</TableCell>
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
                                    {/* <DeleteDropdownItem id={user.id} /> */}
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

export default AdminCustomerPage