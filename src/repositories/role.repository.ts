import type { DocumentType } from '@typegoose/typegoose';

import { Role, RoleModel } from '@/models/role.model';
import { IRepository } from './interfaces';

export class RoleRepository implements IRepository<Role> {
  public async findAll(): Promise<DocumentType<Role>[]> {
    return RoleModel.find();
  }

  public async findById(id: string): Promise<DocumentType<Role> | null> {
    return RoleModel.findById(id);
  }

  public async findOne(filter: Partial<Role>): Promise<DocumentType<Role> | null> {
    return RoleModel.findOne(filter);
  }

  public async create(role: Role): Promise<DocumentType<Role>> {
    return RoleModel.create(role);
  }

  public async update(
    id: string,
    role: Partial<Role>
  ): Promise<DocumentType<Role> | null> {
    return RoleModel.findByIdAndUpdate(id, role, { new: true });
  }

  public async delete(id: string): Promise<boolean> {
    const result = await RoleModel.findByIdAndDelete(id);
    return result !== null;
  }
}
