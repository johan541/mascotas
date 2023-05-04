/* eslint-disable indent */
import { prop, getModelForClass, type Ref } from '@typegoose/typegoose';
import { Permission } from './permission.model';

export class Role {
  @prop({ required: true, trim: true, unique: true })
  name: string;

  @prop({ required: true, ref: () => Permission, default: [] })
  permissions: Ref<Permission>[];
}

export const RoleModel = getModelForClass(Role);
