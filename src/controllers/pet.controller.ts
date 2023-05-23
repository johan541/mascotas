import type { NextApiRequest, NextApiResponse } from 'next';

import { Pet } from '@/models/pet.model';
import { PetRepository, SpeciesBreedRepository } from '@/repositories';
import { Message } from '@/schemas/message.schema';
import { PetCreate } from '@/schemas/pet.schema';
import { IController } from './interfaces';

export class PetController implements IController<Pet> {
  constructor(
    private readonly petRepository: PetRepository,
    private readonly speciesBreedRepository: SpeciesBreedRepository
  ) {}

  public async getAll(
    req: NextApiRequest,
    res: NextApiResponse<Pet[] | Message>
  ): Promise<void> {
    const pet = await this.petRepository.findAll();
    res.status(200).json(pet);
  }

  public async getById(
    req: NextApiRequest,
    res: NextApiResponse<Pet | Message>
  ): Promise<void> {
    const { id } = req.query;
    const pet = await this.petRepository.findById(id as string);
    if (pet) {
      res.status(200).json(pet);
    } else {
      res.status(404).json({ message: 'Mascota no encontrada' });
    }
  }

  public async create(
    req: NextApiRequest,
    res: NextApiResponse<Pet | Message>
  ): Promise<void> {
    try {
      const newPet = req.body as PetCreate;
      const speciesBreed = await this.speciesBreedRepository.findById(
        newPet.speciesBreed
      );
      if (!speciesBreed) {
        return res.status(404).json({ message: 'Especie y raza no encontradas' });
      }

      const pet: Pet = {
        name: newPet.name,
        birthdate: newPet.birthdate,
        gender: newPet.gender,
        speciesBreed: speciesBreed._id,
      };
      const createdPet = await this.petRepository.create(pet);
      res.status(201).json(createdPet);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
    }
  }

  public async update(
    req: NextApiRequest,
    res: NextApiResponse<Pet | Message>
  ): Promise<void> {
    try {
      const { id } = req.query;
      const data = req.body as Partial<Pet>;
      const pet = await this.petRepository.findById(id as string);
      if (!pet) {
        return res.status(404).json({ message: 'Mascota no encontrada' });
      }
      const updatePet: Pet = { ...pet, ...data };
      const updatedPet = await this.petRepository.update(id as string, updatePet);
      if (!updatedPet) {
        return res.status(404).json({ message: 'Mascota no encontrada' });
      }
      res.status(200).json(updatedPet);
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
    const pet = await this.petRepository.delete(id as string);
    if (!pet) {
      return res.status(404).json({ message: 'Mascota no encontrada' });
    }
    res.status(204).send();
  }
}
