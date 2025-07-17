// @ts-nocheck
import ProductModel from "app/DBconfig/models/product"
import { connectMongoDB } from "app/DBconfig/mongoDB"
import { NextResponse } from "next/server";

export async function POST(req) {
  const formData = await req.formData()
  const { title, price, description, image } = Object.fromEntries(formData)
  await connectMongoDB()
  await ProductModel.create({ title, description, price })
  return NextResponse.json({ message: 'Product added successfully' })
}
