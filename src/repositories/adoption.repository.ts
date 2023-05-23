import type { FilterQuery, ProjectionType, Types } from 'mongoose';
import type { DocumentType } from '@typegoose/typegoose';

import { Adoption, AdoptionModel } from '@/models/adoption.model';
import { IRepository } from './interfaces';

export class AdoptionRepository implements IRepository<Adoption> {
  public async findAll(): Promise<DocumentType<Adoption>[]> {
    return AdoptionModel.find();
  }

  public async findById(
    id: Types.ObjectId | string
  ): Promise<DocumentType<Adoption> | null> {
    return AdoptionModel.findById(id);
  }

  public async findOne(
    filter: FilterQuery<Adoption>,
    projection?: ProjectionType<Adoption>
  ): Promise<DocumentType<Adoption> | null> {
    return AdoptionModel.findOne(filter, projection);
  }

  public async create(adoption: Adoption): Promise<DocumentType<Adoption>> {
    return AdoptionModel.create(adoption);
  }

  public async update(
    id: Types.ObjectId | string,
    adoption: Partial<Adoption>
  ): Promise<DocumentType<Adoption> | null> {
    return AdoptionModel.findByIdAndUpdate(id, adoption, { new: true });
  }

  public async delete(id: Types.ObjectId | string): Promise<boolean> {
    const result = await AdoptionModel.findByIdAndDelete(id);
    return result !== null;
  }
}
