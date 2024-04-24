import prisma from '../lib/prisma'
import { UserAndTodo } from './todos'

async function main() {

  //1. delete information previous
  await prisma.todo.deleteMany()
  await prisma.user.deleteMany()

  // 2. generate todos list
  await prisma.user.create({
    data: UserAndTodo
  })
  console.log('Seed completed')
}

(async () => {
  if (process.env.NODE_ENV !== 'production') {
    await main()
  }
})()
