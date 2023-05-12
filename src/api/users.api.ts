import axios from 'axios';

import type { UserCreate, UserSchema } from '@/schemas/user.schema';
import { withAxiosHandler } from './commons';

const ENDPOINT = '/api/users';

export const getAllUsers = withAxiosHandler(async () =>
  axios.get<UserSchema[]>(ENDPOINT)
);

export const getUser = withAxiosHandler(async (userId: UserSchema['_id']) =>
  axios.get<UserSchema>(`${ENDPOINT}/${userId}`)
);

export const createUser = withAxiosHandler(async (user: UserCreate) =>
  axios.post<UserSchema>(ENDPOINT, user)
);
