import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { CiBookmarkCheck } from 'react-icons/ci'
import { LogoutButton, SidebarItem, SidebarProps } from '.'
import {
  IoBasketOutline,
  IoCheckboxOutline,
  IoCodeWorking,
  IoListOutline,
  IoPersonOutline,
} from 'react-icons/io5'
import { auth } from '@/auth/auth'
const menuItems: SidebarProps[] = [
  {
    title: 'Dashboard',
    Icon: <CiBookmarkCheck size={30} />,
    path: '/dashboard',
  },
  {
    title: 'Res TODOS',
    Icon: <IoCheckboxOutline size={30} />,
    path: '/dashboard/rest-todos',
  },
  {
    title: 'Server Actions',
    Icon: <IoListOutline size={30} />,
    path: '/dashboard/server-todos',
  },
  {
    title: 'Cookies',
    Icon: <IoCodeWorking size={30} />,
    path: '/dashboard/cookies',
  },
  {
    title: 'Productos',
    Icon: <IoBasketOutline size={30} />,
    path: '/dashboard/products',
  },
  {
    title: 'Perfil',
    Icon: <IoPersonOutline size={30} />,
    path: '/dashboard/profile',
  },
]

export const Sidebar = async () => {
  const session = await auth()
  return (
    <aside className='ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]'>
      <div>
        <div className='-mx-6 px-6 py-4'>
          <Link href='/dashboard' title='home'>
            <Image
              src={
                'https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg'
              }
              className='w-32'
              width={128}
              height={128}
              alt='tailus logo'
            />
          </Link>
        </div>

        <div className='mt-8 text-center'>
          {/* Next/Image */}
          <Image
            src={
              session?.user?.image ??
              'https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp'
            }
            alt=''
            width={40}
            height={40}
            className='w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28'
          />
          <h5 className='hidden mt-4 text-xl font-semibold text-gray-600 lg:block'>
            {session?.user?.name ?? ''}
          </h5>
          <span className='hidden text-gray-400 lg:block'>
            {session?.user?.roles?.join(',')}
          </span>
        </div>

        <ul className='space-y-2 tracking-wide mt-8'>
          {menuItems.map((menu, index) => (
            <SidebarItem key={index} {...menu} />
          ))}
        </ul>
      </div>

      <div className='px-6 -mx-6 pt-4 flex justify-between items-center border-t'>
        <LogoutButton />
      </div>
    </aside>
  )
}
