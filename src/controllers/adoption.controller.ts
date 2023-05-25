import type { NextApiRequest, NextApiResponse } from 'next';

import { Adoption } from '@/models/adoption.model';
import { AdoptionRepository, PetRepository, UserRepository } from '@/repositories';
import { AdoptionCreate, AdoptionUpdate } from '@/schemas/adoption.schema';
import { Message } from '@/schemas/message.schema';
import { IController } from './interfaces';

export class AdoptionController implements IController<Adoption> {
  constructor(
    private readonly adoptionRepository: AdoptionRepository,
    private readonly userRepository: UserRepository,
    private readonly petRepository: PetRepository
  ) {}

  public async getAll(
    req: NextApiRequest,
    res: NextApiResponse<Adoption[] | Message>
  ): Promise<void> {
    const { userId, petId } = req.query;

    if (userId) {
      const user = await this.userRepository.findById(userId as string);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      const pets = await this.adoptionRepository.findAdoptedPetsByUser(user._id);
      return res.status(200).json(pets);
    }

    if (petId) {
      console.log(petId);
      const pet = await this.petRepository.findById(petId as string);
      if (!pet) {
        return res.status(404).json({ message: 'Mascota no encontrada' });
      }

      const pets = await this.adoptionRepository.findUsersByPet(pet._id);
      return res.status(200).json(pets);
    }

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
      res.status(404).json({ message: 'Adopción no encontrada' });
    }
  }

  public async create(
    req: NextApiRequest,
    res: NextApiResponse<Adoption | Message>
  ): Promise<void> {
    try {
      const newAdoption = req.body as AdoptionCreate;

      const user = await this.userRepository.findById(newAdoption.user);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      const pet = await this.petRepository.findById(newAdoption.pet);
      if (!pet) {
        return res.status(404).json({ message: 'Mascota no encontrada' });
      }

      const createAdoption: Adoption = {
        user: user._id,
        pet: pet._id,
      };

      const adoption = await this.adoptionRepository.findOne(createAdoption);
      if (adoption) {
        return res
          .status(409)
          .json({ message: 'La adopción está en espera de aprobación' });
      }

      const createdAdoption = await this.adoptionRepository.create(createAdoption);
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
      const updateAdoption = req.body as AdoptionUpdate;

      const user = await this.userRepository.findById(updateAdoption.user);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      const pet = await this.petRepository.findById(updateAdoption.pet);
      if (!pet) {
        return res.status(404).json({ message: 'Mascota no encontrada' });
      }

      const adoption: Adoption = {
        user: user._id,
        pet: pet._id,
        isAdopted: updateAdoption.isAdopted,
      };
      const updatedAdoption = await this.adoptionRepository.update(
        id as string,
        adoption
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
      return res.status(404).json({ message: 'Adopción no encontrada' });
    }
    res.status(204).send();
  }
}
