import { PersonSchema } from './person.schema';
import { RoleSchema } from './role.schema';

export class UserSchema {
  readonly _id: string;

  readonly username: string;

  readonly isActive?: boolean;

  readonly person: PersonSchema;

  readonly role: RoleSchema;

  readonly createdAt?: Date | null;

  readonly updatedAt?: Date | null;
}

export type UserCreate = Pick<UserSchema, 'username'> & {
  readonly dni: string;
  readonly password: string;
};

export type UserLogin = Pick<UserSchema, 'username'> & {
  readonly password: string;
};
