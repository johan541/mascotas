import type { NextApiHandler } from 'next';

import { roleController } from '@/lib/dependencies';
import { Role } from '@/models/role.model';
import { Message } from '@/schemas/message.schema';
import { dbConnect } from '@/utils/mongoose';

dbConnect();

type RoleResponse = Role | Role[] | Message;

const handler: NextApiHandler<RoleResponse> = async (req, res) => {
  if (req.method === 'GET') {
    await roleController.getAll(req, res);
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
};

export default handler;
