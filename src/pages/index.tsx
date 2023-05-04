import Image from 'next/image';

import { Layout } from '@/components/Layout';
import { styles } from '@/modules/Home';
import type { NextPageWithLayout } from '@/types/next';
import Link from 'next/link';
import { Routes } from '@/helpers/routes';

const Home: NextPageWithLayout = () => {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>¡Adopta amor incondicional hoy!</h1>
      <p className={styles.text}>
        Descubre el amor incondicional adoptando una mascota. Encuentra tu compañero
        perfecto entre perros y gatos necesitados de un hogar amoroso. Cambia dos vidas,
        ¡adopta hoy!
      </p>
      <Link href={Routes.PETS.path} className={styles.button}>
        Adopta hoy
      </Link>
      <Image
        src='/image/pet.png'
        alt='Pet picture'
        className={styles.image}
        width={290}
        height={494}
      />
    </main>
  );
};

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;
