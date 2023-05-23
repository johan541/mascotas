import type { NextApiHandler } from 'next';

import { petController } from '@/lib/dependencies';
import { Pet } from '@/models/pet.model';
import { Message } from '@/schemas/message.schema';
import { dbConnect } from '@/utils/mongoose';

dbConnect();

type PetResponse = Pet | Pet[] | Message | void;

const handler: NextApiHandler<PetResponse> = async (req, res) => {
  if (req.method === 'GET') {
    await petController.getAll(req, res);
  } else if (req.method === 'POST') {
    await petController.create(req, res);
  } else if (req.method === 'PUT') {
    await petController.update(req, res);
  } else if (req.method === 'DELETE') {
    await petController.delete(req, res);
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
};

export default handler;
