import { SignLayout } from '@/components/Layout';
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
  return <SignLayout title='Iniciar sesión'>{page}</SignLayout>;
};

export default Login;
