import type { NextApiHandler } from 'next';

import { petController } from '@/lib/dependencies';
import { Pet } from '@/models/pet.model';
import { Message } from '@/schemas/message.schema';
import { dbConnect } from '@/utils/mongoose';

dbConnect();

type PetResponse = Pet | Message;

const handler: NextApiHandler<PetResponse> = async (req, res) => {
  // TODO: Colocar autentificacion de endpoint
  if (req.method === 'GET') {
    await petController.getById(req, res);
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
};

export default handler;
