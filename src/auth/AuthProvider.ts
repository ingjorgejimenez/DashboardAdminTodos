
'use client'

import { ReactNode } from "react"
import { SessionProvider } from 'next-auth/react';


interface PropsPage {
  children: ReactNode

}

export const AuthProvider = ({ children, ...rest }: PropsPage) => {
  // return (
  //   <SessionProvider>
  //   { children }
  //   < /SessionProvider>
  // )
  return (children)
}