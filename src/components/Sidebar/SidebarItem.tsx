'use client'
import React, { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
export interface SidebarProps {
  title: string
  Icon: ReactNode
  path: string
}

export const SidebarItem = ({ Icon, title, path }: SidebarProps) => {
  const pathActive = usePathname()
  return (
    <li>
      <Link
        href={path}
        className={` ${
          pathActive === path &&
          'text-white bg-gradient-to-r from-sky-600 to-cyan-400'
        } relative px-4 py-3 flex items-center space-x-4 rounded-xl hover:bg-gradient-to-r hover:text-white hover:bg-sky-600`}
      >
        {Icon}
        <span className='-mr-1 font-medium'>{title}</span>
      </Link>
    </li>
  )
}
