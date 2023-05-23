import type { NextApiHandler } from 'next';

import { speciesBreedController } from '@/lib/dependencies';
import { SpeciesBreed } from '@/models/speciesBreed.model';
import { Message } from '@/schemas/message.schema';
import { dbConnect } from '@/utils/mongoose';

dbConnect();

type RoleResponse = SpeciesBreed | Message;

const handler: NextApiHandler<RoleResponse> = async (req, res) => {
  if (req.method === 'POST') {
    await speciesBreedController.create(req, res);
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
};

export default handler;
