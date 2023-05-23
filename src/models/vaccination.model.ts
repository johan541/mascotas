/* eslint-disable indent */
import { prop, modelOptions, getModelForClass, type Ref } from '@typegoose/typegoose';

import { Pet } from './pet.model';
import { Vaccine } from './vaccine.model';

@modelOptions({ schemaOptions: { timestamps: true } })
export class Vaccination {
  @prop({ options: { id: true } })
  id: string;

  @prop({ required: true, trim: true })
  name: string;

  @prop({ required: true, ref: () => Pet })
  pets: Ref<Pet>;

  @prop({ required: true, ref: () => Vaccine })
  vaccine: Ref<Vaccine>;
}

export const VaccinationModel = getModelForClass(Vaccination);
