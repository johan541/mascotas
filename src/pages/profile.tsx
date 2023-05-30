import { AuthLayout } from '@/components/Layout';
import { ProfileForm, styles } from '@/modules/Profile';
import type { NextPageWithLayout } from '@/types/next';

const Profile: NextPageWithLayout = () => {
  return (
    <main className={styles.main}>
      <section className={styles.content}>
        <h1 className={styles.title}>Perfil</h1>
        <ProfileForm />
      </section>
    </main>
  );
};

Profile.getLayout = function getLayout(page) {
  return <AuthLayout title='Mi perfil'>{page}</AuthLayout>;
};

export default Profile;
