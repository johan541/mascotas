import { PetSchema } from './pet.schema';
import { UserSchema } from './user.schema';

export type AdoptionSchema = {
  readonly _id: string;
  readonly pet: PetSchema;
  readonly user: UserSchema;
  readonly createdAt: Date;
  readonly modifiedAt: Date;
};

export type AdoptionCreate = {
  readonly pet: PetSchema['_id'];
  readonly user: UserSchema['_id'];
};
