import type { FilterQuery, ProjectionType, Types } from 'mongoose';
import type { DocumentType } from '@typegoose/typegoose';

export interface IRepository<T> {
  findAll: () => Promise<DocumentType<T>[]>;
  findById: (id: Types.ObjectId | string) => Promise<DocumentType<T> | null>;
  findOne: (
    filter: FilterQuery<T>,
    projection?: ProjectionType<T>
  ) => Promise<DocumentType<T> | null>;
  create: (model: DocumentType<T>) => Promise<DocumentType<T>>;
  update: (
    id: Types.ObjectId | string,
    model: Partial<DocumentType<T>>
  ) => Promise<T | null>;
  delete: (id: Types.ObjectId | string) => Promise<boolean>;
}
