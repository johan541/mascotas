import { PermissionSchema } from './permission.schema';

export type RoleSchema = {
  readonly _id: string;
  readonly name: string;
  readonly permissions: PermissionSchema[];
};
