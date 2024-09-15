"use client"

import { DropdownMenu, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useTransition } from "react";
import { toggleOutForDelivery } from "../../_actions/sales";
import { useRouter } from "next/navigation";

export function ActiveToggleDropdownItem({ id, outForDelivery} : {
    id: string
    outForDelivery: boolean
}){
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    return <DropdownMenuItem onClick={()=>{
        startTransition(async () => {
            await toggleOutForDelivery(id, !outForDelivery)
            router.refresh()
        })
    }}>{outForDelivery ? "Cancel" : "Out for Delivery" } </DropdownMenuItem>
}

// Delete Drop Down
// export function DeleteDropdownItem({id, disabled} : { id: string
//     disabled: boolean
// }){
//     const router = useRouter()
//     const [isPending, startTransition] = useTransition()
//     return <DropdownMenuItem onClick={()=>{
//         startTransition(async () => {
//             await deleteService(id)
//             router.refresh()
//         })
//     }}>Delete </DropdownMenuItem>
// }