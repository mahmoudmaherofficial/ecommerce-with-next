import { connectMongoDB } from "app/DBconfig/mongoDB";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import UserModel from "app/DBconfig/models/user";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},

      async authorize(credentials, req) {

        await connectMongoDB()


        // @ts-ignore
        const user = await UserModel.findOne({
          // @ts-ignore
          email: credentials.email
        })

        if (user) {
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