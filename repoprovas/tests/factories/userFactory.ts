import bcrypt from 'bcrypt';
import { prisma } from '../../src/database';
import { CreateUserData } from '../../src/services/userService';

export default async function userFactory(user: CreateUserData) {
  return prisma.user.create({
    data: {
      ...user,
      password: bcrypt.hashSync(user.password, 10)
    }
  });
}
