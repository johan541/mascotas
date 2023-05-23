/* eslint-disable indent */
import { prop, getModelForClass, type Ref } from '@typegoose/typegoose';
import { Specie } from './specie.model';
import { Breed } from './breed.model';

export class SpeciesBreed {
  @prop({ required: true, ref: () => Specie })
  specie: Ref<Specie>;

  @prop({ required: true, ref: () => Breed })
  breed: Ref<Breed>;
}

export const SpeciesBreedModel = getModelForClass(SpeciesBreed);
