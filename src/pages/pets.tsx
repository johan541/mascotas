import type { GetServerSideProps } from 'next';

import { getAllPets } from '@/api/pets.api';
import { AuthLayout } from '@/components/Layout';
import { useModal } from '@/components/Modal';
import { CreateFormModal, Gallery, styles } from '@/modules/Pets';
import { PetSchema } from '@/schemas/pet.schema';
import type { NextPageWithLayout } from '@/types/next';

type DataProps = {
  readonly pets: PetSchema[];
};

const Pets: NextPageWithLayout<DataProps> = ({ pets }) => {
  const [isCreateModal, openCreateModal, closeCreateModal] = useModal();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        Encuentra tu mejor amigo:
        <br />
        Explorando nuestra Galería de Adopción
      </h1>
      <button className={styles.button} onClick={openCreateModal}>
        Dar en adopción
      </button>
      <Gallery pets={pets} />

      <CreateFormModal isOpen={isCreateModal} onClose={closeCreateModal} />
    </main>
  );
};

Pets.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Pets;

export const getServerSideProps: GetServerSideProps<DataProps> = async () => {
  const pets = await getAllPets();

  return { props: { pets } };
};
