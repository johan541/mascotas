/* eslint-disable indent */
import { prop, modelOptions, getModelForClass, type Ref } from '@typegoose/typegoose';

import { SpeciesBreed } from './speciesBreed.model';
import { User } from './user.model';

export enum Gender {
  MALE = 'masculino',
  FEMALE = 'femenino',
}

@modelOptions({ schemaOptions: { timestamps: true } })
export class Pet {
  @prop({ required: true, trim: true })
  name: string;

  @prop()
  birthdate?: Date;

  @prop({ required: true, enum: Gender })
  gender: Gender;

  @prop({ required: true, ref: () => SpeciesBreed })
  speciesBreed: Ref<SpeciesBreed>;

  @prop({ required: true, ref: () => User })
  user: Ref<User>;
}

export const PetModel = getModelForClass(Pet);
