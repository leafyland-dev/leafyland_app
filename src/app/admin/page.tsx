import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatter"; 

async function getSalesData() {
    const data = await prisma.placedOrder.aggregate({
        _sum: { pricePaid: true },
        _count: true
    })

    await wait(2000)

    return{
        amount: data._sum.pricePaid || 0,
        numberOfSales: data._count
    }
}

function wait(duration: number){
    return new Promise(resolve=> setTimeout(resolve, duration))
}

async function getUserData(){
    const [ userCount, orderData ] = await Promise.all([
        prisma.user.count(),
        prisma.order.aggregate({
            _sum: { pricePaid: true }
        })
    ])

    return{
        userCount,
        averageValuePerUser: userCount === 0 ? 0 : (orderData._sum.pricePaid || 0 )/ userCount
    }

}

async function getProductData() {
    const [activeCount, inactiveCount] = await Promise.all([
        prisma.product.count({ where: { isAvailable: true }}),
        prisma.product.count({ where: { isAvailable: false }})
    ])

    return { activeCount, inactiveCount }
}

async function getServiceData(){
    const [activeCount, inactiveCount ] = await Promise.all([
        prisma.service.count({where: { isAvailable: true}}),
        prisma.service.count({where: { isAvailable: false }})
    ])
    return { activeCount, inactiveCount}
}

export default async function AdminDashboard(){
    const [salesData, userData, productData, serviceData] = await Promise.all([
        getSalesData(),
        getUserData(),
        getProductData(),
        getServiceData()
    ])
   
    return <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard  
        title="Sales" 
        subtitle={`${formatNumber(salesData.numberOfSales)} Orders`} 
        body={(formatCurrency(salesData.amount/100))} />  
        <DashboardCard 
        title="Customers" 
        subtitle={`${formatCurrency(userData.averageValuePerUser)} Average Value`} 
        body={formatNumber(userData.userCount)} />
        <DashboardCard 
        title="Products" 
        subtitle={`${formatNumber(productData.inactiveCount)} Inactive`} 
        body={formatNumber(productData.activeCount)} />  
        <DashboardCard
        title="Services"
        subtitle={`${formatNumber(serviceData.inactiveCount)} Inactive`}
        body={formatNumber(serviceData.activeCount)} />
    </div>
}

type DashboardCardProps = {
    title: string
    subtitle: string
    body: string
}

function DashboardCard ({ title, subtitle, body }: DashboardCardProps) {
    return <Card>
            <CardHeader>
            <CardTitle>{title}</CardTitle>  
            <CardDescription>{subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
            <p>{body}</p>
            </CardContent>
        </Card>
}