import { Layout } from '@/components/Layout';
import { LoginForm, styles } from '@/modules/Login';
import type { NextPageWithLayout } from '@/types/next';

const Login: NextPageWithLayout = () => {
  return (
    <main className={styles.main}>
      <section className={styles.content}>
        <h1 className={styles.title}>Iniciar sesión</h1>
        <LoginForm />
      </section>
    </main>
  );
};

Login.getLayout = function getLayout(page) {
  return <Layout title='Iniciar sesión'>{page}</Layout>;
};

export default Login;
