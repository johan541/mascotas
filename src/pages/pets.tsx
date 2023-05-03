import { Layout } from '@/components/Layout';
import { styles } from '@/modules/Home';
import type { NextPageWithLayout } from '@/types/next';

const Home: NextPageWithLayout = () => {
  return (
    <main className={styles.main}>
      <h1>Adopción de mascotas</h1>
      <p>¿Quiénes somos?</p>
    </main>
  );
};

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;
