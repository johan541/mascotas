import { Layout } from '@/components/Layout';
import { styles } from '@/modules/Home';
import { LoginForm } from '@/modules/Login';
import type { NextPageWithLayout } from '@/types/next';

const Login: NextPageWithLayout = () => {
  return (
    <main className={styles.main}>
      <h1>Iniciar sesión</h1>
      <LoginForm />
    </main>
  );
};

Login.getLayout = function getLayout(page) {
  return <Layout title='Iniciar sesión'>{page}</Layout>;
};

export default Login;
