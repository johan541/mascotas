import { Layout } from '@/components/Layout';
import { styles } from '@/modules/Home';
import { SignUpForm } from '@/modules/SignUp';
import type { NextPageWithLayout } from '@/types/next';

const SignUp: NextPageWithLayout = () => {
  return (
    <main className={styles.main}>
      <h1>Registrar usuario</h1>
      <SignUpForm />
    </main>
  );
};

SignUp.getLayout = function getLayout(page) {
  return <Layout title='Registrar usuario'>{page}</Layout>;
};

export default SignUp;
