import type { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';

import { getPetsByUser } from '@/api/pets.api';
import { getAdoptedPetsByUser, getUsersByPet } from '@/api/adoption.api';
import { AuthLayout } from '@/components/Layout';
import { AdoptionGallery, Gallery, styles } from '@/modules/MyPets';
import { AdoptionSchema } from '@/schemas/adoption.schema';
import { PetSchema } from '@/schemas/pet.schema';
import type { NextPageWithLayout } from '@/types/next';

type DataProps = {
  readonly adoptedPets: AdoptionSchema[];
  readonly petsForAdoption: Array<{
    pet: PetSchema;
    users: AdoptionSchema[];
  }>;
};

const MyPets: NextPageWithLayout<DataProps> = ({ adoptedPets, petsForAdoption }) => {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Mis mascotas</h1>
      <h2 className={styles.subtitle}>Adoptadas</h2>
      {adoptedPets.length > 0 ? (
        <Gallery adoptedPets={adoptedPets} />
      ) : (
        <span className={styles.error}>No hay mascotas adoptadas</span>
      )}
      <h2 className={styles.subtitle}>En Proceso de Adopción</h2>
      {petsForAdoption.length > 0 ? (
        <AdoptionGallery petsForAdoption={petsForAdoption} />
      ) : (
        <span className={styles.error}>No hay mascotas adoptadas</span>
      )}
    </main>
  );
};

MyPets.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default MyPets;

export const getServerSideProps: GetServerSideProps<DataProps> = async (context) => {
  const token = await getToken({ req: context.req });
  const userId = token?.user._id ?? '';

  const adoptedPets = await getAdoptedPetsByUser(userId);

  const petsForAdoption: DataProps['petsForAdoption'] = [];
  const pets = await getPetsByUser(userId);

  for (const pet of pets) {
    const users = await getUsersByPet(pet._id);

    if (users.some((adoption) => adoption.isAdopted)) {
      continue;
    }

    petsForAdoption.push({ pet, users });
  }

  return { props: { adoptedPets, petsForAdoption } };
};
