/* eslint-disable indent */
import { prop, getModelForClass } from '@typegoose/typegoose';

export class Vaccine {
  @prop({ required: true, trim: true, unique: true })
  name: string;

  @prop({ required: true, trim: true, unique: true })
  laboratory: string;

  @prop({ required: true })
  productionDate: Date;
}

export const VaccineModel = getModelForClass(Vaccine);
