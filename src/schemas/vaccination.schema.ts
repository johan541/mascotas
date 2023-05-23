import { PetSchema } from './pet.schema';
import { VaccineSchema } from './vaccine.schema';

export type VaccinationSchema = {
  readonly id: string;
  readonly name: string;
  readonly aplicationDate: Date;
  readonly pet: PetSchema[];
  readonly vaccine: VaccineSchema[];
};
