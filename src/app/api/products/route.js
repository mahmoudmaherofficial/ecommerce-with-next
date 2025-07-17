// @ts-nocheck
import ProductModel from "app/DBconfig/models/product"
import { connectMongoDB } from "app/DBconfig/mongoDB"
import { NextResponse } from "next/server";

export async function POST(req) {

  const { title, description, price, image } = await req.json()

  connectMongoDB()

  await ProductModel.create({
    title,
    description,
    price
  })

  return NextResponse.json({ message: 'Product added successfully' })

}