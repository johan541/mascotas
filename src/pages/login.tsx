import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import { Layout } from '@/components/Layout';
import { Spinner } from '@/components/loaders';
import { Routes } from '@/helpers/routes';
import { LoginForm, styles } from '@/modules/Login';
import type { NextPageWithLayout } from '@/types/next';

const Login: NextPageWithLayout = () => {
  const router = useRouter();
  const { status } = useSession();

  if (status === 'authenticated') {
    router.push(Routes.HOME.path);
  }

  if (status === 'unauthenticated') {
    return (
      <main className={styles.main}>
        <section className={styles.content}>
          <h1 className={styles.title}>Iniciar sesión</h1>
          <LoginForm />
        </section>
      </main>
    );
  }

  return <Spinner full />;
};

Login.getLayout = function getLayout(page) {
  return <Layout title='Iniciar sesión'>{page}</Layout>;
};

export default Login;
