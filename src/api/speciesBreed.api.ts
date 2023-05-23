import axios from 'axios';

import type {
  SpeciesBreedCreate,
  SpeciesBreedSchema,
} from '@/schemas/speciesBreed.schema';
import { withAxiosHandler } from './commons';

const ENDPOINT = '/api/speciesBreeds';

export const createSpeciesBreed = withAxiosHandler(
  async (specieBreed: SpeciesBreedCreate) =>
    axios.post<SpeciesBreedSchema>(ENDPOINT, specieBreed)
);
