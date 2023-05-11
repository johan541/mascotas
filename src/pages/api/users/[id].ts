import type { NextApiHandler } from 'next';

import { UserController } from '@/controllers/user.controller';
import { User } from '@/models/user.model';
import { Message } from '@/schemas/message.schema';
import { dbConnect } from '@/utils/mongoose';
import { PersonRepository, RoleRepository, UserRepository } from '@/repositories';

dbConnect();

const userRepository = new UserRepository();
const roleRepository = new RoleRepository();
const personRepository = new PersonRepository();
const userController = new UserController(
  userRepository,
  roleRepository,
  personRepository
);

type UserResponse = User | User[] | Message;

const handler: NextApiHandler<UserResponse> = async (req, res) => {
  if (req.method === 'GET') {
    await userController.getById(req, res);
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
};

export default handler;
