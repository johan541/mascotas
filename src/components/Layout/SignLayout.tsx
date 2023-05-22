import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { type FC, type PropsWithChildren, useEffect } from 'react';

import { NavBar } from '@/components/NavBar';
import { Routes } from '@/helpers/routes';
import { titleWithBrand } from './commons';

import styles from './Layout.module.scss';
import { Spinner } from '../loaders';

type Props = {
  readonly title?: string;
  readonly route?: string;
} & PropsWithChildren;

const SignLayout: FC<Props> = ({ title = '', route = Routes.HOME.path, children }) => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    const rootElement = document.getElementById('__next');
    rootElement?.classList.add(styles.layout);

    return () => {
      rootElement?.classList.remove(styles.layout);
    };
  }, []);

  if (status === 'authenticated') {
    router.push(route);
  }

  if (status === 'unauthenticated') {
    return (
      <>
        <Head>
          <title>{titleWithBrand(title)}</title>
        </Head>
        <NavBar />
        {children}
      </>
    );
  }

  return <Spinner full />;
};

export default SignLayout;
