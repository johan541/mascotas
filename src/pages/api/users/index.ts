import type { NextApiHandler } from 'next';

import { userController } from '@/lib/dependencies';
import { User } from '@/models/user.model';
import { Message } from '@/schemas/message.schema';
import { dbConnect } from '@/utils/mongoose';

dbConnect();

type UserResponse = User | User[] | Message;

const handler: NextApiHandler<UserResponse> = async (req, res) => {
  if (req.method === 'GET') {
    await userController.getAll(req, res);
  } else if (req.method === 'POST') {
    await userController.create(req, res);
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
};

export default handler;
