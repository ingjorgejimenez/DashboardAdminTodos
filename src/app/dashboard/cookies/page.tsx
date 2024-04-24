import { TabBar } from '@/components/Cookies'
import { cookies } from 'next/headers'

export default function CookiePage() {
  const cookieStore = cookies()
  const cookieTab = cookieStore.get('selectedTab')?.value ?? '1'
  // const allCookies = cookieStore.getAll()
  // console.log(allCookies)
  return (
    <div>
      <h1>Cookies Page</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
        <div className='flex flex-col'>
          <span className='text-3xl'>Tabs</span>
          <TabBar currenTab={Number(cookieTab)} />
        </div>
      </div>
    </div>
  )
}
