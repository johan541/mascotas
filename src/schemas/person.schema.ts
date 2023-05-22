import { Gender, DocumentType } from '@/models/person.model';

export type PersonSchema = {
  readonly dni: string;
  readonly name: string;
  readonly surname: string;
  readonly address: string;
  readonly email: string;
  readonly phone: number;
  readonly gender: Gender;
  readonly birthdate: Date;
  readonly documentType: DocumentType;
  readonly createdAt: Date;
  readonly modifiedAt: Date;
};

export type PersonCreate = Omit<PersonSchema, 'createdAt' | 'modifiedAt'>;
