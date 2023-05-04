import type { NextApiRequest, NextApiResponse } from 'next';

import { User, UserModel } from '@/models/user.model';
import { dbConnect } from '@/utils/mongoose';

dbConnect();

export default async function handler(req: NextApiRequest, res: NextApiResponse<User[]>) {
  const users = await UserModel.find()
    .populate({ path: 'person', model: 'Person' })
    .populate({
      path: 'role',
      model: 'Role',
      populate: { path: 'permissions', model: 'Permission' },
    });

  res.status(200).json(users);
}
