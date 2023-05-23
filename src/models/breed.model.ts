/* eslint-disable indent */
import { prop, getModelForClass } from '@typegoose/typegoose';

export class Breed {
  @prop({ required: true, trim: true, unique: true })
  name: string;
}

export const PermissionModel = getModelForClass(Breed);
