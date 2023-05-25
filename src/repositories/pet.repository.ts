import type { FilterQuery, ProjectionType, Types } from 'mongoose';
import type { DocumentType } from '@typegoose/typegoose';

import { Pet, PetModel } from '@/models/pet.model';
import { IRepository } from './interfaces';

export class PetRepository implements IRepository<Pet> {
  public async findAll(): Promise<DocumentType<Pet>[]> {
    return PetModel.find().populate({
      path: 'speciesBreed',
      model: 'SpeciesBreed',
      populate: [
        { path: 'specie', model: 'Specie' },
        { path: 'breed', model: 'Breed' },
      ],
    });
  }

  public async findById(id: Types.ObjectId | string): Promise<DocumentType<Pet> | null> {
    return PetModel.findById(id).populate({
      path: 'speciesBreed',
      model: 'SpeciesBreed',
      populate: [
        { path: 'specie', model: 'Specie' },
        { path: 'breed', model: 'Breed' },
      ],
    });
    /*
    db.pets.aggregate([
  {
    $lookup: {
      from: "speciesBreed",
      localField: "speciesBreed",
      foreignField: "id",
      as: "speciesBreed"
    }
  },
  {
    $unwind: "$speciesBreed"
  },
  {
    $lookup: {
      from: "specie",
      localField: "speciesBreed.specie",
      foreignField: "id",
      as: "specie"
    }
  },
  {
    $lookup: {
      from: "breed",
      localField: "speciesBreed.breed",
      foreignField: "id",
      as: "breed"
    }
  },
  {
    $lookup: {
      from: "adoption",
      localField: "id",
      foreignField: "pet",
      as: "adoption"
    }
  },
  {
    $match: {
      "adoption": { $size: 0 }
    }
  },
  {
    $project: {
      id: 1,
      name: 1,
      birthdate: 1,
      "specie.name": 1,
      "breed.name": 1
    }
  }
]);

    */
  }

  public async findOne(
    filter: FilterQuery<Pet>,
    projection?: ProjectionType<Pet>
  ): Promise<DocumentType<Pet> | null> {
    return PetModel.findOne(filter, projection).populate({
      path: 'speciesBreed',
      model: 'SpeciesBreed',
      populate: [
        { path: 'specie', model: 'Specie' },
        { path: 'breed', model: 'Breed' },
      ],
    });
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
