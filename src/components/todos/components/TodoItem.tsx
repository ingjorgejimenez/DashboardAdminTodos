'use client'

import { Todo } from '@prisma/client'
import styles from './TodoItem.module.css'
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5'
import { startTransition, useOptimistic } from 'react'

interface Props extends Todo {
  toggleTodo: (id: string, complete: boolean) => Promise<Todo>
}
export const TodoItem = ({ id, description, complete, toggleTodo }: Props) => {
  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(
    {
      id,
      description,
      complete,
    },
    (state, newCompleteValue: boolean) => ({
      ...state,
      complete: newCompleteValue,
    }),
  )
  const onToggleTodo = async () => {
    try {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.complete))

      await toggleTodo(todoOptimistic.id, !todoOptimistic.complete)
    } catch (error) {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.complete))
    }
  }
  return (
    <div className={complete ? styles.todoDone : styles.todoPending}>
      <div className='flex flex-col sm:flex-row items-center gap-4'>
        <div
          className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 ${
            todoOptimistic.complete ? 'bg-blue-100' : 'bg-red-100'
          }`}
          // onClick={() =>toggleTodo(todoOptimistic.id, !todoOptimistic.complete) }
          onClick={onToggleTodo}
        >
          {todoOptimistic.complete ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </div>
        <div className='text-center sm:text-left'>
          <h4>{todoOptimistic.description}</h4>
        </div>
      </div>
    </div>
  )
}
