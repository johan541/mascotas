import type { NextApiHandler } from 'next';

import { adoptionController } from '@/lib/dependencies';
import { Adoption } from '@/models/adoption.model';
import { Message } from '@/schemas/message.schema';
import { dbConnect } from '@/utils/mongoose';

dbConnect();

type RoleResponse = Adoption | Message;

const handler: NextApiHandler<RoleResponse> = async (req, res) => {
  if (req.method === 'GET') {
    await adoptionController.getById(req, res);
  } else if (req.method === 'PUT') {
    await adoptionController.update(req, res);
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
};

export default handler;
