import type { NextApiRequest, NextApiResponse } from 'next';

import { Role } from '@/models/role.model';
import { RoleRepository } from '@/repositories';
import { Message } from '@/schemas/message.schema';
import { IController } from './interfaces';

export class RoleController implements IController<Role> {
  constructor(private readonly roleRepository: RoleRepository) {}

  public async getAll(
    req: NextApiRequest,
    res: NextApiResponse<Role[] | Message>
  ): Promise<void> {
    const roles = await this.roleRepository.findAll();
    res.status(200).json(roles);
  }

  public async getById(
    req: NextApiRequest,
    res: NextApiResponse<Role | Message>
  ): Promise<void> {
    const { id } = req.query;
    const role = await this.roleRepository.findById(id as string);
    if (role) {
      res.status(200).json(role);
    } else {
      res.status(404).json({ message: 'Rol no encontrado' });
    }
  }

  public async create(
    req: NextApiRequest,
    res: NextApiResponse<Role | Message>
  ): Promise<void> {
    try {
      const newRole = req.body as Role;
      const createdRole = await this.roleRepository.create(newRole);
      res.status(201).json(createdRole);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
    }
  }

  public async update(
    req: NextApiRequest,
    res: NextApiResponse<Role | Message>
  ): Promise<void> {
    try {
      const { id } = req.query;
      const data = req.body as Partial<Role>;
      const role = await this.roleRepository.findById(id as string);
      if (!role) {
        return res.status(404).json({ message: 'Role no encontrado' });
      }
      const updateRole: Role = { ...role, ...data };
      const updatedRole = await this.roleRepository.update(id as string, updateRole);
      if (!updatedRole) {
        return res.status(404).json({ message: 'Rol no encontrado' });
      }
      res.status(200).json(updatedRole);
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
    const role = await this.roleRepository.delete(id as string);
    if (!role) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(204).send();
  }
}
