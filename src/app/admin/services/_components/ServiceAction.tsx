"use client"

import { DropdownMenu, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useTransition } from "react";
import { deleteService, toggleServiceAvailability } from "../../_actions/service";
import { useRouter } from "next/navigation";

export function ActiveToggleDropdownItem({ id, isAvailable} : {
    id: string
    isAvailable: boolean
}){
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    return <DropdownMenuItem onClick={()=>{
        startTransition(async () => {
            await toggleServiceAvailability(id, !isAvailable)
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
            await deleteService(id)
            router.refresh()
        })
    }}>Delete </DropdownMenuItem>
}