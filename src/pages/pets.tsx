import { AuthLayout } from '@/components/Layout';
import { useModal } from '@/components/Modal';
import { styles } from '@/modules/Pets';
import { CreateFormModal } from '@/modules/Pets';
import type { NextPageWithLayout } from '@/types/next';

const Pets: NextPageWithLayout = () => {
  const [isCreateModal, openCreateModal, closeCreateModal] = useModal();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        Encuentra tu mejor amigo:
        <br />
        Explora nuestra Galería de Adopción
      </h1>
      <button className={styles.button} onClick={openCreateModal}>
        Dar en adopción
      </button>

      <CreateFormModal isOpen={isCreateModal} onClose={closeCreateModal} />
    </main>
  );
};

Pets.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Pets;
