import bcrypt from 'bcryptjs';

export const UserAndTodo = {
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