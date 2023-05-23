/* eslint-disable indent */
import { prop, modelOptions, getModelForClass, type Ref } from '@typegoose/typegoose';

import { SpeciesBreed } from './speciesBreed.model';

export enum Gender {
  MALE = 'masculino',
  FEMALE = 'femenino',
}

@modelOptions({ schemaOptions: { timestamps: true } })
export class Pet {
  @prop({ required: true, trim: true })
  name: string;

  @prop({ required: true })
  birthdate: Date;

  @prop({ required: true, enum: Gender })
  gender: Gender;

  @prop({ required: true, ref: () => SpeciesBreed })
  speciesBreed: Ref<SpeciesBreed>;
}

export const PetModel = getModelForClass(Pet);
