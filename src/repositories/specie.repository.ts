import type { FilterQuery, ProjectionType, Types } from 'mongoose';
import type { DocumentType } from '@typegoose/typegoose';

import { Specie, SpecieModel } from '@/models/specie.model';
import { IRepository } from './interfaces';

export class SpecieRepository implements IRepository<Specie> {
  public async findAll(): Promise<DocumentType<Specie>[]> {
    return SpecieModel.find();
  }

  public async findById(
    id: Types.ObjectId | string
  ): Promise<DocumentType<Specie> | null> {
    return SpecieModel.findById(id);
  }

  public async findOne(
    filter: FilterQuery<Specie>,
    projection?: ProjectionType<Specie>
  ): Promise<DocumentType<Specie> | null> {
    return SpecieModel.findOne(filter, projection);
  }

  public async create(specie: Specie): Promise<DocumentType<Specie>> {
    return SpecieModel.create(specie);
  }

  public async update(
    id: Types.ObjectId | string,
    specie: Partial<Specie>
  ): Promise<DocumentType<Specie> | null> {
    return SpecieModel.findByIdAndUpdate(id, specie, { new: true });
  }

  public async delete(id: Types.ObjectId | string): Promise<boolean> {
    const result = await SpecieModel.findByIdAndDelete(id);
    return result !== null;
  }
}
