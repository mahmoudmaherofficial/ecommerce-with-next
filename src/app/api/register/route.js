import UserModel from "app/DBconfig/models/user";
import { connectMongoDB } from "app/DBconfig/mongoDB";
import { NextResponse } from "next/server"

export async function POST(req) {
  // 1. Recive data from frontend
  const userData = await req.json()
  console.log('*******************************');
  console.log(userData)
  console.log('*******************************');
  const { name, email, password } = userData

  // 2. Connect to DB
  await connectMongoDB()

  // 4. Check if email exists
  // @ts-ignore
  const userExists = await UserModel.findOne({ email });
  if (userExists) {
    return NextResponse.json(
      { error: "User already exists" },
      { status: 409 }
    );
  }


  // 4. Save data to DB
  // @ts-ignore
  await UserModel.create({ name, email, password })


  // 5. Return response to frontend
  return NextResponse.json({})
}