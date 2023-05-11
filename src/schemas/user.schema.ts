import { PersonSchema } from './person.schema';
import { RoleSchema } from './role.schema';

export type UserSchema = {
  readonly _id: string;
  readonly username: string;
  readonly isActive: boolean;
  readonly person: PersonSchema;
  readonly role: RoleSchema;
  readonly createdAt: Date;
  readonly updatedAt: Date;
};

export type UserCreate = {
  readonly dni: string;
  readonly username: string;
  readonly password: string;
};
