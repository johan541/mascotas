import type { DocumentType } from '@typegoose/typegoose';

import { Person, PersonModel } from '@/models/person.model';
import { IRepository } from './interfaces';

export class PersonRepository implements IRepository<Person> {
  public async findAll(): Promise<DocumentType<Person>[]> {
    return PersonModel.find();
  }

  public async findById(id: string): Promise<DocumentType<Person> | null> {
    return PersonModel.findById(id);
  }

  public async findOne(filter: Partial<Person>): Promise<DocumentType<Person> | null> {
    return PersonModel.findOne(filter);
  }

  public async create(person: Person): Promise<DocumentType<Person>> {
    return PersonModel.create(person);
  }

  public async update(
    id: string,
    person: Partial<Person>
  ): Promise<DocumentType<Person> | null> {
    return PersonModel.findByIdAndUpdate(id, person, { new: true });
  }

  public async delete(id: string): Promise<boolean> {
    const result = await PersonModel.findByIdAndDelete(id);
    return result !== null;
  }
}
