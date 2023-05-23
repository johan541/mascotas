/* eslint-disable indent */
import { prop, modelOptions, getModelForClass, type Ref } from '@typegoose/typegoose';

import { Pet } from './pet.model';
import { User } from './user.model';

@modelOptions({ schemaOptions: { timestamps: true } })
export class Adoption {
  @prop({ required: true, ref: () => Pet })
  pet: Ref<Pet>;

  @prop({ required: true, ref: () => User })
  user: Ref<User>;
}

export const AdoptionModel = getModelForClass(Adoption);
