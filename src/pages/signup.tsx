import { SignLayout } from '@/components/Layout';
import { SignUpForm, styles } from '@/modules/SignUp';
import type { NextPageWithLayout } from '@/types/next';

const SignUp: NextPageWithLayout = () => {
  return (
    <main className={styles.main}>
      <section className={styles.content}>
        <h1 className={styles.title}>Registrar usuario</h1>
        <SignUpForm />
      </section>
    </main>
  );
};

SignUp.getLayout = function getLayout(page) {
  return <SignLayout title='Registrar usuario'>{page}</SignLayout>;
};

export default SignUp;
