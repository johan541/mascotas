import type { NextApiRequest, NextApiResponse } from 'next';

import { Adoption } from '@/models/adoption.model';
import { AdoptionRepository } from '@/repositories';
import { Message } from '@/schemas/message.schema';
import { IController } from './interfaces';

export class AdoptionController implements IController<Adoption> {
  constructor(private readonly adoptionRepository: AdoptionRepository) {}

  public async getAll(
    req: NextApiRequest,
    res: NextApiResponse<Adoption[] | Message>
  ): Promise<void> {
    const adoption = await this.adoptionRepository.findAll();
    res.status(200).json(adoption);
  }

  public async getById(
    req: NextApiRequest,
    res: NextApiResponse<Adoption | Message>
  ): Promise<void> {
    const { id } = req.query;
    const adoption = await this.adoptionRepository.findById(id as string);
    if (adoption) {
      res.status(200).json(adoption);
    } else {
      res.status(404).json({ message: 'Adopcion no encontrada' });
    }
  }

  public async create(
    req: NextApiRequest,
    res: NextApiResponse<Adoption | Message>
  ): Promise<void> {
    try {
      const newAdoption = req.body as Adoption;
      const createdAdoption = await this.adoptionRepository.create(newAdoption);
      res.status(201).json(createdAdoption);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
    }
  }

  public async update(
    req: NextApiRequest,
    res: NextApiResponse<Adoption | Message>
  ): Promise<void> {
    try {
      const { id } = req.query;
      const data = req.body as Partial<Adoption>;
      const adoption = await this.adoptionRepository.findById(id as string);
      if (!adoption) {
        return res.status(404).json({ message: 'Adopción no encontrada' });
      }
      const updateAdoption: Adoption = { ...adoption, ...data };
      const updatedAdoption = await this.adoptionRepository.update(
        id as string,
        updateAdoption
      );
      if (!updatedAdoption) {
        return res.status(404).json({ message: 'Adopción no encontrada' });
      }
      res.status(200).json(updatedAdoption);
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
    const adoption = await this.adoptionRepository.delete(id as string);
    if (!adoption) {
      return res.status(404).json({ message: 'Adopcion no encontrada' });
    }
    res.status(204).send();
  }
}
