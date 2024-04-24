import { authSession } from '@/common/actions/authSession';
import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup';

interface Segmentos {
  params: { id: 'string' }
}

const getTodo = async (id: string) => {
  const { user } = await authSession()

  if (!user) {
    return null;
  }

  const todo = await prisma.todo.findFirst({ where: { id, userId: user.id } })

  if (todo?.userId !== user.id) {
    return null;
  }

  return todo
}

export async function GET(request: Request, { params }: Segmentos) {
  const { id } = params;
  const todoById = getTodo(id)

  if (!todoById) {
    return NextResponse.json({ message: `Todo with ${id} not found` }, { status: 404 })
  }
  return NextResponse.json(todoById)
}

const putSchema = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional(),
})

export async function PUT(request: Request, { params }: Segmentos) {
  const { id } = params;
  const todoById = await prisma.todo.findFirst({ where: { id } })

  if (!todoById) {
    return NextResponse.json({ message: `Todo with ${id} not found` }, { status: 404 })
  }
  try {
    const { description, complete, ...rest } = await putSchema.validate(await request.json())
    const updateTodo = await prisma.todo.update({ where: { id }, data: { description, complete } })
    return NextResponse.json(updateTodo)
  } catch (error) {
    return NextResponse.json(error, { status: 400 })
  }

}