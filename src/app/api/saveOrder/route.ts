import { NextResponse } from 'next/server';
import prisma from '@/db/db';

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Parse the request body

    const { name, productName, phone, address, pinCode, city, state, pricePaid } = body;
    
    // Check if all required fields are present
    if (!name || !phone || !address || !pinCode || !city || !state || !pricePaid) {
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
    }

    const order = await prisma.placedOrder.create({
      data: {
        name,
        productName,
        phone,
        address,
        pinCode,
        city,
        state,
        pricePaid,
      },
    });

    return NextResponse.json({ success: true, order }, { status: 200 });
  } catch (error) {
    console.error('Error saving order:', error);
    return NextResponse.json({ success: false, message: 'Failed to save order' }, { status: 500 });
  }
}
