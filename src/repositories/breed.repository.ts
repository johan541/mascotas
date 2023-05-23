import type { FilterQuery, ProjectionType, Types } from 'mongoose';
import type { DocumentType } from '@typegoose/typegoose';

import { Breed, BreedModel } from '@/models/breed.model';
import { IRepository } from './interfaces';

export class BreedRepository implements IRepository<Breed> {
  public async findAll(): Promise<DocumentType<Breed>[]> {
    return BreedModel.find();
  }

  public async findById(
    id: Types.ObjectId | string
  ): Promise<DocumentType<Breed> | null> {
    return BreedModel.findById(id);
  }

  public async findOne(
    filter: FilterQuery<Breed>,
    projection?: ProjectionType<Breed>
  ): Promise<DocumentType<Breed> | null> {
    return BreedModel.findOne(filter, projection);
  }

  public async create(role: Breed): Promise<DocumentType<Breed>> {
    return BreedModel.create(role);
  }

  public async update(
    id: Types.ObjectId | string,
    role: Partial<Breed>
  ): Promise<DocumentType<Breed> | null> {
    return BreedModel.findByIdAndUpdate(id, role, { new: true });
  }

  public async delete(id: Types.ObjectId | string): Promise<boolean> {
    const result = await BreedModel.findByIdAndDelete(id);
    return result !== null;
  }
}
