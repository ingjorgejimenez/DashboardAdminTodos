export const dynamic = 'force-dynamic' //forzar o quitar cache para que revalide cada vez que se entre la data
export const revalidate = 0

import prisma from '@/lib/prisma'
import { NewTodo, TodosGrid } from '@/components/todos'
import { auth } from '@/auth'
import { authSession } from '@/common/actions/authSession'

export const metadata = {
  title: 'Listado de Todos',
  description: 'SEO Title',
}
export default async function RestTodosPage() {
  const { user } = await authSession()
  const todos = await prisma.todo.findMany({
    orderBy: { description: 'asc' },
    where: { userId: user?.id },
  })
  return (
    <div>
      <div className='w-full px-3 mx-5 mb-5'>
        <NewTodo />
      </div>
      <TodosGrid items={todos} />
    </div>
  )
}
