'use client'

import { FormEvent, useState } from 'react'
import { IoTrashOutline } from 'react-icons/io5'
import * as todosApi from '@/common/helpers/todos'
import { useRouter } from 'next/navigation'
import { addTodo, deleteCompletedTodo } from '@/common/actions/todo-actions'

export const NewTodo = () => {
  const [description, setDescription] = useState('')
  const router = useRouter()
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (description.trim().length === 0) return
    // addTodo(description)
    setDescription('')

    const newTodo = await todosApi.createTodo(description)
    console.log(newTodo)
    if (newTodo) {
      router.refresh()
    }
  }

  //sin server actions
  // const onDeleteComplete = async () => {
  //   const deleteCompleted = await todosApi.deleteCompleted()
  //   if (deleteCompleted) {
  //     router.refresh()
  //    }
  // }

  const deleteWithActions = () => {
    console.log('client delete')
    deleteCompletedTodo()
  }
  return (
    <form className='flex w-full' onSubmit={onSubmit}>
      <input
        onChange={e => setDescription(e.target.value)}
        value={description}
        type='text'
        className='w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all'
        placeholder='¿Qué necesita ser hecho?'
      />

      <button
        type='submit'
        className='flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all'
      >
        Crear
      </button>

      <span className='flex flex-1'></span>

      <button
        onClick={deleteWithActions}
        type='button'
        className='flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all'
      >
        <IoTrashOutline />
        <span className='mx-2'>Borrar Completados</span>
      </button>
    </form>
  )
}
