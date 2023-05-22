import type { FilterQuery, ProjectionType, Types } from 'mongoose';
import type { DocumentType } from '@typegoose/typegoose';

import { User, UserModel } from '@/models/user.model';
import { IRepository } from './interfaces';

export class UserRepository implements IRepository<User> {
  public async findAll(): Promise<DocumentType<User>[]> {
    return UserModel.find()
      .populate({ path: 'person', model: 'Person' })
      .populate({
        path: 'role',
        model: 'Role',
        populate: { path: 'permissions', model: 'Permission' },
      })
      .select('-password')
      .exec();
  }

  public async findById(id: Types.ObjectId | string): Promise<DocumentType<User> | null> {
    return UserModel.findById(id)
      .populate({ path: 'person', model: 'Person' })
      .populate({
        path: 'role',
        model: 'Role',
        populate: { path: 'permissions', model: 'Permission' },
      })
      .select('-password')
      .exec();
  }

  public async findOne(
    filter: FilterQuery<User>,
    projection?: ProjectionType<User>
  ): Promise<DocumentType<User> | null> {
    return UserModel.findOne(filter, projection)
      .populate({ path: 'person', model: 'Person' })
      .populate({
        path: 'role',
        model: 'Role',
        populate: { path: 'permissions', model: 'Permission' },
      })
      .exec();
  }

  public async create(user: User): Promise<DocumentType<User>> {
    return UserModel.create(user);
  }

  public async update(
    id: Types.ObjectId | string,
    user: Partial<User>
  ): Promise<DocumentType<User> | null> {
    return UserModel.findByIdAndUpdate(id, user, { new: true })
      .populate({ path: 'person', model: 'Person' })
      .populate({
        path: 'role',
        model: 'Role',
        populate: { path: 'permissions', model: 'Permission' },
      });
  }

  public async delete(id: Types.ObjectId | string): Promise<boolean> {
    const result = await UserModel.findByIdAndDelete(id);
    return result !== null;
  }
}
