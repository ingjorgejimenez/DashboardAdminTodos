import Image from 'next/image'
import { redirect } from 'next/navigation'

export default function Home() {
  return redirect('/dashboard')
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1>Todo</h1>
    </main>
  )
}
