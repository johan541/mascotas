import { PersonController } from '@/controllers/person.controller';
import { RoleController } from '@/controllers/role.controller';
import { UserController } from '@/controllers/user.controller';
import { PersonRepository, RoleRepository, UserRepository } from '@/repositories';

// Repository dependencies
const personRepository = new PersonRepository();
const roleRepository = new RoleRepository();
const userRepository = new UserRepository();

// Controllers dependencies
export const personController = new PersonController(personRepository);
export const roleController = new RoleController(roleRepository);
export const userController = new UserController(
  userRepository,
  roleRepository,
  personRepository
);
