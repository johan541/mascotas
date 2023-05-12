import axios from 'axios';

import type { PersonCreate, PersonSchema } from '@/schemas/person.schema';
import { withAxiosHandler } from './commons';

const ENDPOINT = '/api/people';

export const getAllPeople = withAxiosHandler(async () =>
  axios.get<PersonSchema[]>(ENDPOINT)
);

export const createPerson = withAxiosHandler(async (person: PersonCreate) =>
  axios.post<PersonSchema>(ENDPOINT, person)
);
