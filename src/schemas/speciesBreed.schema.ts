import { SpecieSchema } from './specie.schema';
import { BreedSchema } from './breed.schema';

export type SpeciesBreedSchema = {
  readonly _id: string;
  readonly specie: SpecieSchema;
  readonly breed: BreedSchema;
};

export type SpeciesBreedCreate = {
  readonly specie: SpecieSchema['name'];
  readonly breed: BreedSchema['name'];
};
