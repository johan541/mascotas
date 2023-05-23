/* eslint-disable indent */
import { prop, modelOptions, getModelForClass, type Ref } from '@typegoose/typegoose';
import { Specie } from './specie.model';
import { Breed } from './breed.model';
@modelOptions({ schemaOptions: { timestamps: true } })
export class SpeciesBreed {
  @prop({ required: true, ref: () => Specie })
  specie: Ref<Specie>;

  @prop({ required: true, ref: () => Breed })
  breed: Ref<Breed>;
}
export const SpecieBreedModel = getModelForClass(SpeciesBreed);
