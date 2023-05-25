import { Gender } from '@/models/pet.model';
import { SpeciesBreedSchema } from './speciesBreed.schema';
import { UserSchema } from './user.schema';

export type PetSchema = {
  readonly _id: string;
  readonly name: string;
  readonly birthdate?: Date;
  readonly gender: Gender;
  readonly speciesBreed: SpeciesBreedSchema;
  readonly user: UserSchema | UserSchema['_id'];
  readonly createdAt: Date;
  readonly modifiedAt: Date;
};

export type PetCreate = Pick<PetSchema, 'name' | 'birthdate' | 'gender'> & {
  speciesBreed: SpeciesBreedSchema['_id'];
  user: UserSchema['_id'];
};
