'use client'

import { Loading } from '@/common/components/Loading'
import { useGetSession } from '@/common/hook/useGetSession'
import { signIn, signOut } from 'next-auth/react'
import { CiLogin, CiLogout, CiUser } from 'react-icons/ci'

export const LogoutButton = () => {
  const { user, loading } = useGetSession()
  const handleSinOut = async () => {
    await signOut()
  }
  if (loading) return <Loading />
  return user ? (
    <button className='px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group'>
      <CiLogout />
      <span className='group-hover:text-gray-700' onClick={handleSinOut}>
        Logout
      </span>
    </button>
  ) : (
    <button className='px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group'>
      <CiUser />
      <span
        className='group-hover:text-gray-700'
        onClick={async () => {
          await signIn()
        }}
      >
        Sin In
      </span>
    </button>
  )
}
