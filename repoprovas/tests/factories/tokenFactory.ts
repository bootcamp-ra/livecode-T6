import jwt from 'jsonwebtoken';
import userBodyFactory from './userBodyFactory';
import userFactory from './userFactory';

export async function tokenFactory() {
  const user = userBodyFactory();

  const createdUser = await userFactory(user);

  return jwt.sign({ userId: createdUser.id }, process.env.JWT_SECRET);
}
