import type { NextApiHandler } from 'next';

import { RoleController } from '@/controllers/role.controller';
import { Role } from '@/models/role.model';
import { RoleRepository } from '@/repositories/role.repository';
import { Message } from '@/schemas/message.schema';
import { dbConnect } from '@/utils/mongoose';

dbConnect();

const roleRepository = new RoleRepository();
const roleController = new RoleController(roleRepository);

type RoleResponse = Role | Role[] | Message;

const handler: NextApiHandler<RoleResponse> = async (req, res) => {
  if (req.method === 'GET') {
    await roleController.getAll(req, res);
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
};

export default handler;
