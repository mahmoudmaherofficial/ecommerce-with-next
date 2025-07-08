import UserModel from "app/DBconfig/models/user";
import { connectMongoDB } from "app/DBconfig/mongoDB";
import { NextResponse } from "next/server"

export async function POST(req) {
  // 1. Recive data from frontend
  const userData = await req.json()
  console.log('*******************************');
  console.log(userData)
  console.log('*******************************');

  // 2. Connect to DB
  await connectMongoDB()

  // 3. Save data to DB
  const { name, email, password } = userData
  // @ts-ignore
  await UserModel.create({ name, email, password })


  // 4. Return response to frontend
  return NextResponse.json({})
}