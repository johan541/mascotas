import type { NextApiHandler } from 'next';

import { PersonController } from '@/controllers/person.controller';
import { Person } from '@/models/person.model';
import { PersonRepository } from '@/repositories';
import { Message } from '@/schemas/message.schema';
import { dbConnect } from '@/utils/mongoose';

dbConnect();

const personRepository = new PersonRepository();
const personController = new PersonController(personRepository);

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
