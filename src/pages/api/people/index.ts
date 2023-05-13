import type { NextApiHandler } from 'next';

import { personController } from '@/lib/dependencies';
import { Person } from '@/models/person.model';
import { Message } from '@/schemas/message.schema';
import { dbConnect } from '@/utils/mongoose';

dbConnect();

type PersonResponse = Person | Person[] | Message;

const handler: NextApiHandler<PersonResponse> = async (req, res) => {
  if (req.method === 'GET') {
    await personController.getAll(req, res);
  } else if (req.method === 'POST') {
    await personController.create(req, res);
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
};

export default handler;
