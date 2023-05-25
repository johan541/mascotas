import axios from 'axios';

import type {
  AdoptionCreate,
  AdoptionSchema,
  AdoptionUpdate,
} from '@/schemas/adoption.schema';
import { withAxiosHandler } from './commons';

const ENDPOINT = 'http://127.0.0.1:3000/api/adoptions';

export const createAdoption = withAxiosHandler(async (adoption: AdoptionCreate) =>
  axios.post<AdoptionSchema>(ENDPOINT, adoption)
);

export const updateAdoption = withAxiosHandler(
  async (adoptionId: AdoptionSchema['_id'], adoption: AdoptionUpdate) =>
    axios.put<AdoptionSchema>(`${ENDPOINT}/${adoptionId}`, adoption)
);

export const getAdoptedPetsByUser = withAxiosHandler(
  async (userId: AdoptionSchema['user']['_id']) =>
    axios.get<AdoptionSchema[]>(ENDPOINT, { params: { userId } })
);

export const getUsersByPet = withAxiosHandler(
  async (petId: AdoptionSchema['pet']['_id']) =>
    axios.get<AdoptionSchema[]>(ENDPOINT, { params: { petId } })
);
