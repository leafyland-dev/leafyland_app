import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import Link from "next/link"
import { descriptionFormatter, formatCurrency } from "@/lib/formatter"
import { Button } from "./ui/button"

type ProductCardProps = {
    id: string,
    name: string,
    description: string,
    price: number,
    category: string | null,
    imagePath: string | null
}

export async function ProductCard({id, name, description, price, imagePath}: ProductCardProps) {
    
    return<>
            <Card className="flex overflow-hidden flex-col text-[#091f0f]">
                {/* <div className="relative w-full h-auto aspect-video">
                    <Image src={imagePath} fill alt={name}/>
                </div> */}
                <div className="relative w-full h-auto aspect-video">
                {imagePath ? (
                    <Image src={imagePath} fill alt={name} />
                ) : (
                    <div className="placeholder-image">Image not available</div> // Fallback content
                )}
            </div>
                <CardHeader>
                    <CardTitle className="text-lg lg:text:2xl">
                        {name}
                    </CardTitle>
                    <CardDescription>
                        {descriptionFormatter(description)}...
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p>{formatCurrency(price)}</p>
                </CardContent>
                <CardFooter>
                    <Button >
                    <Link href={`/products/${id}/product-details`}>View Details</Link>

                    </Button>
                </CardFooter>
            </Card>
    </>
}