import type { FilterQuery, ProjectionType, Types } from 'mongoose';
import type { DocumentType } from '@typegoose/typegoose';

import { Role, RoleModel } from '@/models/role.model';
import { IRepository } from './interfaces';

export class RoleRepository implements IRepository<Role> {
  public async findAll(): Promise<DocumentType<Role>[]> {
    return RoleModel.find();
  }

  public async findById(id: Types.ObjectId | string): Promise<DocumentType<Role> | null> {
    return RoleModel.findById(id);
  }

  public async findOne(
    filter: FilterQuery<Role>,
    projection?: ProjectionType<Role>
  ): Promise<DocumentType<Role> | null> {
    return RoleModel.findOne(filter, projection);
  }

  public async create(role: Role): Promise<DocumentType<Role>> {
    return RoleModel.create(role);
  }

  public async update(
    id: Types.ObjectId | string,
    role: Partial<Role>
  ): Promise<DocumentType<Role> | null> {
    return RoleModel.findByIdAndUpdate(id, role, { new: true });
  }

  public async delete(id: Types.ObjectId | string): Promise<boolean> {
    const result = await RoleModel.findByIdAndDelete(id);
    return result !== null;
  }
}
