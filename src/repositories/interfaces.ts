import type { DocumentType } from '@typegoose/typegoose';

export interface IRepository<T> {
  findAll: () => Promise<DocumentType<T>[]>;
  findById: (id: string) => Promise<DocumentType<T> | null>;
  findOne: (filter: Partial<T>) => Promise<DocumentType<T> | null>;
  create: (model: DocumentType<T>) => Promise<DocumentType<T>>;
  update: (id: string, model: Partial<DocumentType<T>>) => Promise<T | null>;
  delete: (id: string) => Promise<boolean>;
}
