import { PersonController } from '@/controllers/person.controller';
import { RoleController } from '@/controllers/role.controller';
import { UserController } from '@/controllers/user.controller';
import { AdoptionController } from '@/controllers/adoption.controller';
import { PetController } from '@/controllers/pet.controller';
import {
  PersonRepository,
  PetRepository,
  RoleRepository,
  UserRepository,
  AdoptionRepository,
  SpecieRepository,
  BreedRepository,
  SpeciesBreedRepository,
} from '@/repositories';
import { SpeciesBreedController } from '@/controllers/speciesBreed.controller';

// Repository dependencies
const personRepository = new PersonRepository();
const roleRepository = new RoleRepository();
const userRepository = new UserRepository();
const petRepository = new PetRepository();
const adoptionRepository = new AdoptionRepository();
const specieRepository = new SpecieRepository();
const breedRepository = new BreedRepository();
const speciesBreedRepository = new SpeciesBreedRepository();

// Controllers dependencies
export const personController = new PersonController(personRepository);
export const roleController = new RoleController(roleRepository);
export const petController = new PetController(petRepository, speciesBreedRepository);
export const adoptionController = new AdoptionController(
  adoptionRepository,
  userRepository,
  petRepository
);
export const userController = new UserController(
  userRepository,
  roleRepository,
  personRepository
);
export const speciesBreedController = new SpeciesBreedController(
  specieRepository,
  breedRepository,
  speciesBreedRepository
);
