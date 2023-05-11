import type { NextApiRequest, NextApiResponse } from 'next';

import { Message } from '@/schemas/message.schema';

export interface IController<T> {
  getAll: (req: NextApiRequest, res: NextApiResponse<T[] | Message>) => Promise<void>;
  getById: (req: NextApiRequest, res: NextApiResponse<T | Message>) => Promise<void>;
  create: (req: NextApiRequest, res: NextApiResponse<T | Message>) => Promise<void>;
  update: (req: NextApiRequest, res: NextApiResponse<T | Message>) => Promise<void>;
  delete: (req: NextApiRequest, res: NextApiResponse<void | Message>) => Promise<void>;
}
