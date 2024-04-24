// Admin Dashboard https://tailwindcomponents.com/component/dashboard-12
import { authSession } from '@/common/actions/authSession'
import { Sidebar } from '@/components/Sidebar'
import { TopMenu } from '@/components/Sidebar/TopMenu'
import { redirect } from 'next/navigation'
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = await authSession()
  if (!user) {
    redirect('/api/auth/signin')
  }
  return (
    <>
      <Sidebar />
      <div className='ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen'>
        <TopMenu />
        <div className='px-6 pt-6 bg-white p-2 pb-5 m-2 rounded'>
          {children}
        </div>
      </div>
    </>
  )
}
