'use server'
import { auth } from '@/auth'
import { User } from 'next-auth'
export interface TUser extends User { }

export const authSession = async () => {
  const session = await auth()
  return { session, user: session?.user }
}