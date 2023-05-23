import axios from 'axios';

import type { PetCreate, PetSchema } from '@/schemas/pet.schema';
import { withAxiosHandler } from './commons';

const ENDPOINT = '/api/pets';

export const getAllPets = withAxiosHandler(async () =>
  axios.get<PetSchema[]>(`https://mascotas-ochre.vercel.app${ENDPOINT}`)
);

export const getPet = withAxiosHandler(async (petId: PetSchema['_id']) =>
  axios.get<PetSchema>(`${ENDPOINT}/${petId}`)
);

export const createPet = withAxiosHandler(async (pet: PetCreate) =>
  axios.post<PetSchema>(ENDPOINT, pet)
);

export const updatePet = withAxiosHandler(
  async (petId: PetSchema['_id'], pet: Partial<PetSchema>) =>
    axios.put<PetSchema>(`${ENDPOINT}/${petId}`, pet)
);

export const deletePet = withAxiosHandler(async (petId: PetSchema['_id']) =>
  axios.delete<PetSchema>(`${ENDPOINT}/${petId}`)
);
