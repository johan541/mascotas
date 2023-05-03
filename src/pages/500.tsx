import { useRouter } from 'next/router';
import { IconPaw } from '@tabler/icons-react';

import { Layout } from '@/components/Layout';
import styles from '@/styles/organisms/error.module.scss';
import type { NextPageWithLayout } from '@/types/next';

const InternalServerError: NextPageWithLayout = () => {
  const router = useRouter();

  return (
    <main className={styles.main}>
      <IconPaw size={256} stroke={1.5} className={styles.icon} aria-hidden />
      <h2 className={styles.title}>Oops...</h2>
      <p className={styles.paragraph}>Parece que esta vez hemos sido nosotros.</p>
      <button className={styles.button} onClick={router.reload}>
        Recargar página
      </button>
    </main>
  );
};

InternalServerError.getLayout = function getLayout(page) {
  return <Layout title='Error'>{page}</Layout>;
};

export default InternalServerError;
