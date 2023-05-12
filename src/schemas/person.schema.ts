export type PersonSchema = {
  readonly dni: string;
  readonly name: string;
  readonly surname: string;
  readonly address: string;
  readonly email: string;
  readonly phone: number;
  readonly gender: 'masculino' | 'femenino';
  readonly birthdate: Date;
  readonly documentType: 'T.I.' | 'C.C.' | 'C.E.';
  readonly createdAt: Date;
  readonly modifiedAt: Date;
};

export type PersonCreate = Omit<PersonSchema, 'createdAt' | 'modifiedAt'>;
