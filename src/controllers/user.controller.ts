import type { NextApiRequest, NextApiResponse } from 'next';

import { generateHash, verifyPassword } from '@/lib/security/pwd';
import { User } from '@/models/user.model';
import { UserRepository, RoleRepository, PersonRepository } from '@/repositories';
import { Message } from '@/schemas/message.schema';
import { UserCreate, UserLogin, UserSchema } from '@/schemas/user.schema';
import { IController } from './interfaces';

export class UserController implements IController<User | UserSchema> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly personRepository: PersonRepository
  ) {}

  public async getAll(
    req: NextApiRequest,
    res: NextApiResponse<User[] | Message>
  ): Promise<void> {
    const users = await this.userRepository.findAll();
    res.status(200).json(users);
  }

  public async getById(
    req: NextApiRequest,
    res: NextApiResponse<User | Message>
  ): Promise<void> {
    const { id } = req.query;
    const user = await this.userRepository.findById(id as string);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  }

  public async create(
    req: NextApiRequest,
    res: NextApiResponse<User | Message>
  ): Promise<void> {
    try {
      const { dni, username, password } = req.body as UserCreate;

      const person = await this.personRepository.findOne({ dni });
      if (!person) {
        return res.status(404).json({ message: 'Persona no encontrada' });
      }

      const user = await this.userRepository.findOne({ username });
      if (user) {
        return res.status(409).json({ message: 'El usuario ya existe' });
      }

      const role = await this.roleRepository.findOne({ name: 'user' });
      if (!role) {
        return res.status(404).json({ message: 'Rol no encontrado' });
      }

      const hashedPassword = await generateHash(password);
      const newUser: User = {
        username,
        password: hashedPassword,
        person: person._id,
        role: role._id,
      };
      const createdUser = await this.userRepository.create(newUser);
      const { password: pwd, ...userNoPwd } = createdUser.toObject();

      res.status(201).json(userNoPwd);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
    }
  }

  public async update(
    req: NextApiRequest,
    res: NextApiResponse<User | Message>
  ): Promise<void> {
    try {
      const { id } = req.query;
      const data = req.body as Partial<Omit<User, 'role'>>;
      const user = await this.userRepository.findById(id as string);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      const updateUser: User = { ...user, ...data };
      const updatedUser = await this.userRepository.update(id as string, updateUser);
      if (!updatedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json(updatedUser);
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
    const user = await this.userRepository.delete(id as string);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(204).send();
  }

  public async login(credentials: UserLogin): Promise<UserSchema> {
    const { username, password } = credentials;
    const user = await this.userRepository.findOne({ username });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    if (!user.isActive) {
      throw new Error('Usuario inactivo');
    }

    const isValidPassword = await verifyPassword(password, user.password ?? '');

    if (!isValidPassword) {
      throw new Error('Contraseña incorrecta');
    }

    return user.toObject<UserSchema>({
      transform(doc, ret) {
        delete ret.password;
        return ret;
      },
    });
  }
}
