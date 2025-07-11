import UserModel from "app/DBconfig/models/user";
import { connectMongoDB } from "app/DBconfig/mongoDB";
import { NextResponse } from "next/server"
import bcrypt from 'bcrypt'

export async function POST(req) {
  // 1. Recive data from frontend
  const userData = await req.json()
  const { name, email, password } = userData

  // 2. Connect to DB
  await connectMongoDB()

  // 3. Check if email exists
  // @ts-ignore
  const userExists = await UserModel.findOne({ email });
  if (userExists) {
    return NextResponse.json(
      { error: "User already exists" },
      { status: 409 }
    );
  }

  // 4.Hashing password with bcrypt.js
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt)

  // 5. Save data to DB
  // @ts-ignore
  await UserModel.create({ name, email, password: hashedPassword })


  // 6. Return response to frontend
  return NextResponse.json({})
}