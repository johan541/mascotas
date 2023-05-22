import type { FilterQuery, ProjectionType, Types } from 'mongoose';
import type { DocumentType } from '@typegoose/typegoose';

import { Person, PersonModel } from '@/models/person.model';
import { IRepository } from './interfaces';

export class PersonRepository implements IRepository<Person> {
  public async findAll(): Promise<DocumentType<Person>[]> {
    return PersonModel.find();
  }

  public async findById(
    id: Types.ObjectId | string
  ): Promise<DocumentType<Person> | null> {
    return PersonModel.findById(id);
  }

  public async findOne(
    filter: FilterQuery<Person>,
    projection?: ProjectionType<Person>
  ): Promise<DocumentType<Person> | null> {
    return PersonModel.findOne(filter, projection);
  }

  public async create(person: Person): Promise<DocumentType<Person>> {
    return PersonModel.create(person);
  }

  public async update(
    id: Types.ObjectId | string,
    person: Partial<Person>
  ): Promise<DocumentType<Person> | null> {
    return PersonModel.findByIdAndUpdate(id, person, { new: true });
  }

  public async delete(id: Types.ObjectId | string): Promise<boolean> {
    const result = await PersonModel.findByIdAndDelete(id);
    return result !== null;
  }
}
