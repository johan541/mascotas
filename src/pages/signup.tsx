import { Layout } from '@/components/Layout';
import { SignUpForm, styles } from '@/modules/SignUp';
import type { NextPageWithLayout } from '@/types/next';

const SignUp: NextPageWithLayout = () => {
  return (
    <main className={styles.main}>
      <section className={styles.content}>
        <h1>Registrar usuario</h1>
        <SignUpForm />
      </section>
    </main>
  );
};

SignUp.getLayout = function getLayout(page) {
  return <Layout title='Registrar usuario'>{page}</Layout>;
};

export default SignUp;
