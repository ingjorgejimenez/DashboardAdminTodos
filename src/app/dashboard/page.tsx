import { auth } from '@/auth/auth'
import { WidgetItem } from '@/common/components/WidgetItem'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const session = await auth()
  return (
    <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      <WidgetItem title='Usuario Conectado server-side'>
        <h3 className='text-2xl font-semibold'>{session?.user?.name}</h3>
        <span className='text-gray-500'>{session?.user?.email}</span>
        {session?.user?.image && (
          <Image
            src={session?.user?.image}
            alt=''
            width={40}
            height={40}
            className='w-10 h-10 rounded-full object-cover lg:w-28 lg:h-28'
          />
        )}
      </WidgetItem>
    </div>
  )
}
