import { Button } from "@/components/ui/button";
import { PageHeader } from "../_components/PageHeader";
import Link  from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import db from "@/db/db";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/formatter";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ActiveToggleDropdownItem, DeleteDropdownItem } from "./_components/ProductActions";


export default function AdminProductPage(){
    return <>
    <div className="flex justify-between items-center gap-4">
        <PageHeader>Products</PageHeader>
        <Button asChild>
            <Link href="/admin/products/new">Add Product</Link>
        </Button>
    </div>
    <ProductsTable/>
    </>
}

async function ProductsTable(){
    const products = await db.product.findMany({
        select: {
            id: true,
            name: true,
            category: true,
            price: true,
            isAvailable: true,
            _count: {select: {orders: true}}
        },
        orderBy: { name: "asc" }
    })

    if( products.length === 0) return <p>No products found</p>
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-0">
                        <span className="sr-only"> Available For Purchase</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead className="w-0">
                        <span className="sr-only"> Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map(product => (
                    <TableRow key={product.id}>
                        <TableCell>
                            {product.isAvailable ? (
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
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{formatCurrency(product.price)}</TableCell>
                        <TableCell>{formatNumber(product._count.orders)}</TableCell>
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
                                        <Link download href={`/admin/products/${product.id}/edit`}>
                                            Edit
                                        </Link>
                                    </DropdownMenuItem>
                                    <ActiveToggleDropdownItem id={product.id} isAvailable = {product.isAvailable} />
                                    <DropdownMenuSeparator/>
                                    <DeleteDropdownItem id={product.id} disabled= {product._count.orders > 0}/>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}