"use client"

import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { useRouter } from "next/navigation"
// import { useRouter } from "next/router"
import { useTransition } from "react"
import { deleteUser } from "../../_actions/customers"

// Delete Drop Down
export function DeleteDropdownItem({id} : { id: string
}){
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    return <DropdownMenuItem onClick={()=>{
        startTransition(async () => {
            await deleteUser(id)
            router.refresh()
        })
    }}>Delete </DropdownMenuItem>
}