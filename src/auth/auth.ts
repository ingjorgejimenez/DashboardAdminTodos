import { signInEmailPassword } from "@/common/actions/auth-actions"
import prisma from "@/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { NextAuthConfig } from "next-auth"
import { Adapter } from "next-auth/adapters"
import CredentialsProvider from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

// interface IUser {
//   user?: {
//     address: string
//     roles?: string[];
//     isActive?: boolean;
//     id: string
//   } & DefaultSession["user"]
// }

// declare module "next-auth" {
//   interface Session {
//     user?: IUser
//   }
// }


// const prisma = new PrismaClient()
const providers = [
  GitHub,
  Google,
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email", placeholder: "ejemplo@google.com" },
      password: { label: "Password", type: "password", placeholder: '**' }
    },
    async authorize(credentials) {
      try {
        const user = await signInEmailPassword(credentials.email as string ?? '', credentials.password as string ?? '')
        console.log(user)
        if (user) return user
        return null
      } catch (e) {
        console.log(e)
        return null
      }
    },
  }),
]

export const config = {
  // theme: { logo: '../../public/images/logo.png' },
  adapter: PrismaAdapter(prisma) as Adapter,
  providers,
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log(user);
      return true;
    },
    async jwt({ token, user, account, profile }) {
      const dbUser = await prisma.user.findUnique({ where: { email: token.email ?? 'no-email' } })
      if (!dbUser?.isActive) {
        throw new Error('Usuario no esta activo')
      }
      token.roles = dbUser?.roles ?? ['no-roles']
      token.id = dbUser?.id ?? 'no-uuid'
      // console.log(token)
      return token
    },
    async session({ session, token, user }) {
      // console.log(token)
      if (session && session.user) {
        session.user.roles = token.roles
        session.user.id = token.id
      }
      return session
    }
  }

} satisfies NextAuthConfig

export const { handlers, signIn, signOut, auth } = NextAuth(config)
// ({
//   clientId: process.env.GITHUB_ID,
//   clientSecret: process.env.GITHUB_SECRET
// })