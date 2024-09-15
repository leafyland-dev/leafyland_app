import { Nav, NavLink } from "@/components/Nav";

export const dynamic = "force-dynamic"  //ignoring the cache

export default function AdminLayout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return(
        <>
        <Nav>
            <NavLink href="/admin"> Dashboard</NavLink>
            <NavLink href="/admin/sales">Sales</NavLink>
            <NavLink href="/admin/customers">Customers</NavLink>
            <NavLink href="/admin/products">Products</NavLink>
            <NavLink href="/admin/services">Services</NavLink>

        </Nav>
        <div className="container my-6">{children}</div>
        </>
    );
}