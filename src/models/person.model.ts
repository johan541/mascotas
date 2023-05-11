/* eslint-disable indent */
import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose';

enum Gender {
  MALE = 'masculino',
  FEMALE = 'femenino',
}

enum DocumentType {
  TI = 'T.I.',
  CC = 'C.C.',
  CE = 'C.E.',
}

@modelOptions({ schemaOptions: { timestamps: true } })
export class Person {
  @prop({ options: { id: true } })
  dni: string;

  @prop({ required: true, trim: true })
  name: string;

  @prop({ required: true, trim: true })
  surname: string;

  @prop({ trim: true })
  address?: string;

  @prop({ required: true, trim: true, index: true })
  email: string;

  @prop({ required: true, min: 0 })
  phone: number;

  @prop({ required: true, enum: Gender })
  gender: Gender;

  @prop({ required: true })
  birthdate: Date;

  @prop({ required: true, enum: DocumentType })
  documentType: DocumentType;
}

export const PersonModel = getModelForClass(Person);
