import { authSession } from '@/common/actions/authSession';
import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup';

export async function GET(request: Request) {

  const { searchParams } = new URL(request.url)
  const take = Number(searchParams.get('take') ?? '10')
  const skip = +(searchParams.get('skip') ?? '0')


  if (isNaN(take)) {
    return new Response(JSON.stringify(
      { message: `take: ${searchParams.get('take')}  is not a number` }
    ), { status: 400 });
  }

  if (isNaN(skip)) {
    return new Response(JSON.stringify(
      { message: `skip: ${searchParams.get('skip')}  is not a number` }
    ), { status: 400 });
  }

  const todos = await prisma.todo.findMany({
    take,
    skip
  })

  // const todos = await prisma.todo.findMany()
  return NextResponse.json(todos)
}


const postSchema = yup.object({
  description: yup.string().required('description is required'),
  complete: yup.boolean().optional().default(false),
})
export async function POST(request: Request) {

  try {
    const { user } = await authSession()

    if (!user) {
      return NextResponse.json('No authorization', { status: 401 })
    }

    const body = await request.json();
    const { complete, description, ...rest } = await postSchema.validate(body)

    // console.log(!!{})
    // if (rest) {
    //   return NextResponse.json({ message: `rest: ${JSON.stringify(rest, null, 1)} No existe en la data requerida` }, { status: 400 })
    // }

    const todo = await prisma.todo.create({ data: { complete, description, userId: user.id } })
    return NextResponse.json(todo)

  } catch (error) {
    return NextResponse.json(error, { status: 400 })
  }
}

export async function DELETE() {
  try {
    const { user } = await authSession() // Obtener las cookies ya que viajan por la header
    const { count } = await prisma.todo.deleteMany({ where: { complete: true, userId: user?.id } })
    return NextResponse.json(`items: ${count} deleted successfully`)
  } catch (error) {
    return NextResponse.json(error, { status: 400 })
  }
}