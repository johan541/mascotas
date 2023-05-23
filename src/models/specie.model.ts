/* eslint-disable indent */
import { prop, getModelForClass } from '@typegoose/typegoose';

export class Specie {
  @prop({ required: true, trim: true, lowercase: true, unique: true })
  name: string;
}

export const SpecieModel = getModelForClass(Specie);
