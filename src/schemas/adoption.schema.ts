import { PetSchema } from './pet.schema';
import { UserSchema } from './user.schema';

export type AdoptionSchema = {
  readonly _id: string;
  readonly pet: PetSchema[];
  readonly user: UserSchema[];
};

export type AdoptionCreate = Omit<AdoptionSchema, 'createdAt'>;
