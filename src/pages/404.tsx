import { IconPaw } from '@tabler/icons-react';

import { Layout } from '@/components/Layout';
import styles from '@/styles/organisms/error.module.scss';
import type { NextPageWithLayout } from '@/types/next';

const NotFound: NextPageWithLayout = () => {
  return (
    <main className={styles.main}>
      <IconPaw size={256} stroke={1.5} className={styles.icon} aria-hidden />
      <h2 className={styles.title}>Oops...</h2>
      <p className={styles.paragraph}>No encontramos lo que buscabas.</p>
    </main>
  );
};

NotFound.getLayout = function getLayout(page) {
  return <Layout title='Página no encontrada'>{page}</Layout>;
};

export default NotFound;
