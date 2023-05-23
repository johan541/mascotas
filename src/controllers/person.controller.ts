import type { NextApiRequest, NextApiResponse } from 'next';

import { Person } from '@/models/person.model';
import { PersonRepository } from '@/repositories';
import { Message } from '@/schemas/message.schema';
import { IController } from './interfaces';
import { calculateYears } from '@/utils/date';

export class PersonController implements IController<Person> {
  constructor(private readonly personRepository: PersonRepository) {}

  public async getAll(
    req: NextApiRequest,
    res: NextApiResponse<Person[] | Message>
  ): Promise<void> {
    const persons = await this.personRepository.findAll();
    res.status(200).json(persons);
  }

  public async getById(
    req: NextApiRequest,
    res: NextApiResponse<Person | Message>
  ): Promise<void> {
    const { id } = req.query;
    const person = await this.personRepository.findById(id as string);
    if (person) {
      res.status(200).json(person);
    } else {
      res.status(404).json({ message: 'Persona no encontrada' });
    }
  }

  public async create(
    req: NextApiRequest,
    res: NextApiResponse<Person | Message>
  ): Promise<void> {
    try {
      const newPerson = req.body as Person;

      const person = await this.personRepository.findOne({ dni: newPerson.dni });
      if (person) {
        return res.status(409).json({ message: 'La persona ya existe' });
      }

      const userAge = calculateYears(newPerson.birthdate);
      if (userAge < 14) {
        return res
          .status(400)
          .json({ message: 'Debes tener al menos 14 años para registrarte' });
      }

      const createdPerson = await this.personRepository.create(newPerson);
      res.status(201).json(createdPerson);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
    }
  }

  public async update(
    req: NextApiRequest,
    res: NextApiResponse<Person | Message>
  ): Promise<void> {
    try {
      const { dni } = req.query;
      const data = req.body as Partial<Person>;
      const person = await this.personRepository.findById(dni as string);
      if (!person) {
        return res.status(404).json({ message: 'Person no encontrado' });
      }
      const updatePerson: Person = { ...person, ...data };
      const updatedPerson = await this.personRepository.update(
        dni as string,
        updatePerson
      );
      if (!updatedPerson) {
        return res.status(404).json({ message: 'Rol no encontrado' });
      }
      res.status(200).json(updatedPerson);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
    }
  }

  public async delete(
    req: NextApiRequest,
    res: NextApiResponse<void | Message>
  ): Promise<void> {
    const { id } = req.query;
    const person = await this.personRepository.delete(id as string);
    if (!person) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(204).send();
  }
}
