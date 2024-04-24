import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcryptjs';

export async function GET(request: Request) {

  await prisma.todo.deleteMany()
  await prisma.user.deleteMany()

  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: bcrypt.hashSync('123456'),
      roles: ['admin', 'client', 'super-user'],
      todos: {
        create: [
          { description: 'lorem Ips incorrectly', complete: true },
          { description: 'lorem Ips incorrectly' },
          { description: 'piedra del poder' },
          { description: ' por defect del poder' },
          { description: 'Todos completed' },
          { description: ' Default del poder' },
          { description: 'piedra de realidad' },
        ]
      }
    }
  })

  // const todo = await prisma.todo.create({
  //   data: {
  //     description: 'lorem Ips incorrectly',
  //     complete: true
  //   }
  // })

  // await prisma.todo.createMany({
  //   data: [
  //     { description: 'lorem Ips incorrectly', complete: true },
  //     { description: 'lorem Ips incorrectly' },
  //     { description: 'piedra del poder' },
  //     { description: ' por defect del poder' },
  //     { description: 'Todos completed' },
  //     { description: ' Default del poder' },
  //     { description: 'piedra de realidad' },

  //   ]
  // })
  return new Response(JSON.stringify(
    { message: 'Successfully Created Todos' }
  ), { status: 200 });
}