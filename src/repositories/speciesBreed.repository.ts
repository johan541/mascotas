import type { FilterQuery, ProjectionType, Types } from 'mongoose';
import type { DocumentType } from '@typegoose/typegoose';

import { SpeciesBreed, SpeciesBreedModel } from '@/models/speciesBreed.model';
import { IRepository } from './interfaces';

export class SpeciesBreedRepository implements IRepository<SpeciesBreed> {
  public async findAll(): Promise<DocumentType<SpeciesBreed>[]> {
    return SpeciesBreedModel.find()
      .populate({ path: 'specie', model: 'Specie' })
      .populate({ path: 'breed', model: 'Breed' })
      .exec();
  }

  public async findById(
    id: Types.ObjectId | string
  ): Promise<DocumentType<SpeciesBreed> | null> {
    return SpeciesBreedModel.findById(id)
      .populate({ path: 'specie', model: 'Specie' })
      .populate({ path: 'breed', model: 'Breed' })
      .exec();
  }

  public async findOne(
    filter: FilterQuery<SpeciesBreed>,
    projection?: ProjectionType<SpeciesBreed>
  ): Promise<DocumentType<SpeciesBreed> | null> {
    return SpeciesBreedModel.findOne(filter, projection)
      .populate({ path: 'specie', model: 'Specie' })
      .populate({ path: 'breed', model: 'Breed' })
      .exec();
  }

  public async create(role: SpeciesBreed): Promise<DocumentType<SpeciesBreed>> {
    return SpeciesBreedModel.create(role);
  }

  public async update(
    id: Types.ObjectId | string,
    role: Partial<SpeciesBreed>
  ): Promise<DocumentType<SpeciesBreed> | null> {
    return SpeciesBreedModel.findByIdAndUpdate(id, role, { new: true });
  }

  public async delete(id: Types.ObjectId | string): Promise<boolean> {
    const result = await SpeciesBreedModel.findByIdAndDelete(id);
    return result !== null;
  }
}
