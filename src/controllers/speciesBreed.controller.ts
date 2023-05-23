import type { NextApiRequest, NextApiResponse } from 'next';

import { SpeciesBreed } from '@/models/speciesBreed.model';
import {
  BreedRepository,
  SpecieRepository,
  SpeciesBreedRepository,
} from '@/repositories';
import { Message } from '@/schemas/message.schema';
import { SpeciesBreedCreate } from '@/schemas/speciesBreed.schema';
import { IController } from './interfaces';

export class SpeciesBreedController implements IController<SpeciesBreed> {
  constructor(
    private readonly specieRepository: SpecieRepository,
    private readonly breedRepository: BreedRepository,
    private readonly speciesBreedRepository: SpeciesBreedRepository
  ) {}

  public async getAll(
    req: NextApiRequest,
    res: NextApiResponse<SpeciesBreed[] | Message>
  ): Promise<void> {
    const speciesBreeds = await this.speciesBreedRepository.findAll();
    res.status(200).json(speciesBreeds);
  }

  public async getById(
    req: NextApiRequest,
    res: NextApiResponse<SpeciesBreed | Message>
  ): Promise<void> {
    const { id } = req.query;
    const speciesBreed = await this.speciesBreedRepository.findById(id as string);
    if (speciesBreed) {
      res.status(200).json(speciesBreed);
    } else {
      res.status(404).json({ message: 'Rol no encontrado' });
    }
  }

  public async create(
    req: NextApiRequest,
    res: NextApiResponse<SpeciesBreed | Message>
  ): Promise<void> {
    try {
      const newSpeciesBreed = req.body as SpeciesBreedCreate;

      let specie = await this.specieRepository.findOne({
        name: newSpeciesBreed.specie.toLowerCase(),
      });
      if (!specie) {
        specie = await this.specieRepository.create({ name: newSpeciesBreed.specie });
      }

      let breed = await this.breedRepository.findOne({
        name: newSpeciesBreed.breed.toLowerCase(),
      });
      if (!breed) {
        breed = await this.breedRepository.create({ name: newSpeciesBreed.breed });
      }

      const createdSpeciesBreed = await this.speciesBreedRepository.create({
        specie: specie._id,
        breed: breed._id,
      });
      res.status(201).json(createdSpeciesBreed);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
    }
  }

  public async update(
    req: NextApiRequest,
    res: NextApiResponse<SpeciesBreed | Message>
  ): Promise<void> {
    try {
      const { id } = req.query;
      const data = req.body as Partial<SpeciesBreed>;
      const role = await this.speciesBreedRepository.findById(id as string);
      if (!role) {
        return res.status(404).json({ message: 'SpeciesBreed no encontrado' });
      }
      const updateSpeciesBreed: SpeciesBreed = { ...role, ...data };
      const updatedSpeciesBreed = await this.speciesBreedRepository.update(
        id as string,
        updateSpeciesBreed
      );
      if (!updatedSpeciesBreed) {
        return res.status(404).json({ message: 'Registro no encontrado' });
      }
      res.status(200).json(updatedSpeciesBreed);
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
    const role = await this.speciesBreedRepository.delete(id as string);
    if (!role) {
      return res.status(404).json({ message: 'SpeciesBreed no encontrado' });
    }
    res.status(204).send();
  }
}
