import type { FilterQuery, ProjectionType, Types } from 'mongoose';
import type { DocumentType } from '@typegoose/typegoose';

import { Pet, PetModel } from '@/models/pet.model';
import { IRepository } from './interfaces';

export class PetRepository implements IRepository<Pet> {
  public async findAll(): Promise<DocumentType<Pet>[]> {
    return PetModel.find();
  }

  public async findById(id: Types.ObjectId | string): Promise<DocumentType<Pet> | null> {
    return PetModel.findById(id);
  }

  public async findOne(
    filter: FilterQuery<Pet>,
    projection?: ProjectionType<Pet>
  ): Promise<DocumentType<Pet> | null> {
    return PetModel.findOne(filter, projection);
  }

  public async create(pet: Pet): Promise<DocumentType<Pet>> {
    return PetModel.create(pet);
  }

  public async update(
    id: Types.ObjectId | string,
    pet: Partial<Pet>
  ): Promise<DocumentType<Pet> | null> {
    return PetModel.findByIdAndUpdate(id, pet, { new: true });
  }

  public async delete(id: Types.ObjectId | string): Promise<boolean> {
    const result = await PetModel.findByIdAndDelete(id);
    return result !== null;
  }
}
