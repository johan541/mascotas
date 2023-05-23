import { SpecieSchema } from './specie.schema';
import { BreedSchema } from './breed.schema';

export type SpeciesBreedSchema = {
  readonly id: string;
  readonly specie: SpecieSchema[];
  readonly breed: BreedSchema[];
};
