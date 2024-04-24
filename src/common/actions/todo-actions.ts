'use server'

import prisma from "@/lib/prisma"
import { Todo } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { authSession } from "./authSession"

export const sleep = (seconds: number) => {
  return new Promise(resolve => {
    setTimeout(() => { resolve(true) }, seconds * 1000)
  })
}

export const toggleTodo = async (id: string, complete: boolean): Promise<Todo> => {
  // 'use server'
  // await sleep(3)
  const todo = await prisma.todo.findFirst({ where: { id } })
  if (!todo) {
    throw `Todo with id ${id} no found`
  }
  const updatedTodo = await prisma.todo.update({ where: { id }, data: { complete } })
  revalidatePath('/dashboard/server-todos')
  revalidatePath('/dashboard/rest-todos')
  return updatedTodo
}

type AddProps = {
  message: string;
} | Todo
export const addTodo = async (description: string): Promise<AddProps> => {
  try {
    const { user } = await authSession()
    const todo = await prisma.todo.create({ data: { description, userId: user?.id } })
    revalidatePath('/dashboard/server-todos')
    revalidatePath('/dashboard/rest-todos')
    return todo
  } catch (error) {
    return { message: `Todo with description: ${description} Error created` }
  }
}

export const deleteCompletedTodo = async (): Promise<void> => {
  try {
    const { user } = await authSession()
    const { count } = await prisma.todo.deleteMany({ where: { complete: true, userId: user?.id } })
    console.log(count)
    revalidatePath('/dashboard/server-todos')
    revalidatePath('/dashboard/rest-todos')
  } catch (error) {
    console.log(error)
  }
}