'use client'
import { Todo } from '@prisma/client'
import { TodoItem } from '..'
// import * as todosApi from '@/common/helpers/todos'
import { useRouter } from 'next/navigation'
import { toggleTodo } from '@/common/actions/todo-actions'

interface TodosProps {
  items?: Todo[]
}

export const TodosGrid = ({ items = [] }: TodosProps) => {
  const router = useRouter()

  // como se realizaba antes de serve actions

  // const toggleTodo = async (id: string, complete: boolean) => {
  //   const updatedTodo = await todosApi.updateTodo(id, complete)
  //   router.refresh() // me refresca y actualiza el servidor y solo actualiza lo que ha cambiado
  //   return updatedTodo
  // }

  // sever actions Next >14
  // se le pasa la función directamente al toggle

  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
      {items.map(todo => (
        <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
      ))}
    </div>
  )
}
