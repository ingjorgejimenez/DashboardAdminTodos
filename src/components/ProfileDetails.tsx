'use client'

import { Loading } from '@/common/components/Loading'
import { useGetSession } from '@/common/hook/useGetSession'
import Image from 'next/image'
export const ProfileDetails = () => {
  const { user: data, loading } = useGetSession()
  if (!data || loading) return <Loading />
  return (
    <div className='flex flex-col'>
      <span className='text-3xl font-semibold mb-1'>
        {data?.name ?? 'Not name'}
      </span>
      <span className='mb-3'>{data?.email ?? 'Not Email'}</span>
      {data?.image && (
        <Image
          className='object-contain'
          src={data?.image}
          alt='PERFIL'
          width={100}
          height={100}
        />
      )}
      <span className='mb-3'>
        {'Roles: ' + data?.roles?.join(' - ') ?? 'Not Email'}
      </span>
    </div>
  )
}
