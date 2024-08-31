"use client"

import { DropdownMenu, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useTransition } from "react";
import { deleteProduct, toggleProductAvailability } from "../../_actions/products";
import { useRouter } from "next/navigation";

export function ActiveToggleDropdownItem({ id, isAvailable} : {
    id: string
    isAvailable: boolean
}){
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    return <DropdownMenuItem onClick={()=>{
        startTransition(async () => {
            await toggleProductAvailability(id, !isAvailable)
            router.refresh()
        })
    }}>{isAvailable ? "Deactivate" : "Activate" } </DropdownMenuItem>
}

export function DeleteDropdownItem({id, disabled} : { id: string
    disabled: boolean
}){
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    return <DropdownMenuItem onClick={()=>{
        startTransition(async () => {
            await deleteProduct(id)
            router.refresh()
        })
    }}>Delete </DropdownMenuItem>
}



