import { Gender } from '@/models/pet.model';
import { SpeciesBreedSchema } from './speciesBreed.schema';

export type PetSchema = {
  readonly _id: string;
  readonly name: string;
  readonly birthdate?: Date;
  readonly gender: Gender;
  readonly speciesBreed: SpeciesBreedSchema;
  readonly createdAt: Date;
  readonly modifiedAt: Date;
};

export type PetCreate = Pick<PetSchema, 'name' | 'birthdate' | 'gender'> & {
  speciesBreed: SpeciesBreedSchema['_id'];
};
