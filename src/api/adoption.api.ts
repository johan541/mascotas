import axios from 'axios';

import type {
  AdoptionCreate,
  AdoptionSchema,
  AdoptionUpdate,
} from '@/schemas/adoption.schema';
import { withAxiosHandler } from './commons';

const ENDPOINT = '/api/adoptions';

export const createAdoption = withAxiosHandler(async (adoption: AdoptionCreate) =>
  axios.post<AdoptionSchema>(ENDPOINT, adoption)
);

export const updateAdoption = withAxiosHandler(
  async (adoptionId: AdoptionSchema['_id'], adoption: AdoptionUpdate) =>
    axios.put(`${ENDPOINT}/${adoptionId}`, adoption)
);
