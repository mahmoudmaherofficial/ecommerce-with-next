import { connectMongoDB } from "app/DBconfig/mongoDB";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import UserModel from "app/DBconfig/models/user";
import bcrypt from 'bcrypt'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},

      async authorize(credentials, req, res) {
        await connectMongoDB()

        // @ts-ignore
        const user = await UserModel.findOne({
          email: credentials.email
        })

        if (user) {
          const match = await bcrypt.compare(credentials.password, user.password)
          console.log('match', match)
          if (!match) return null
          return user
        } else {
          return null
        }
      }

    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signin'
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };