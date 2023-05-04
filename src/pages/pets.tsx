import { Layout } from '@/components/Layout';
import { useModal } from '@/components/Modal';
import { styles } from '@/modules/Home';
import { CreateFormModal } from '@/modules/Pets';
import type { NextPageWithLayout } from '@/types/next';

const Home: NextPageWithLayout = () => {
  const [isCreateModal, openCreateModal, closeCreateModal] = useModal();
  return (
    <main className={styles.main}>
      <h1>Adopción de mascotas</h1>
      <p>¿Quiénes somos?</p>
      <button onClick={openCreateModal}>Registrar mascota</button>

      <CreateFormModal isOpen={isCreateModal} onClose={closeCreateModal} />
    </main>
  );
};

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;