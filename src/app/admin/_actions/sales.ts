"use server"

import db from "@/db/db";


export async function toggleOutForDelivery(id: string, outForDelivery: boolean){
    await db.placedOrder.update({where: {id}, data: {
        outForDelivery
    }})
  }