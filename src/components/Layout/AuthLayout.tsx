import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { type FC, type PropsWithChildren, useEffect } from 'react';

import { NavBar } from '@/components/NavBar';
import { AuthRoutes } from '@/helpers/routes';
import { titleWithBrand } from './commons';

import styles from './Layout.module.scss';
import { Spinner } from '../loaders';

type Props = {
  readonly title?: string;
  readonly route?: string;
} & PropsWithChildren;

const AuthLayout: FC<Props> = ({
  title = '',
  route = AuthRoutes.SIGN_IN.path,
  children,
}) => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    const rootElement = document.getElementById('__next');
    rootElement?.classList.add(styles.layout);

    return () => {
      rootElement?.classList.remove(styles.layout);
    };
  }, []);

  if (status === 'unauthenticated') {
    router.push(route);
  }

  if (status === 'authenticated') {
    return (
      <>
        <Head>
          <title>{titleWithBrand(title)}</title>
        </Head>
        <NavBar sessionStatus={status} />
        {children}
      </>
    );
  }

  return <Spinner full />;
};

export default AuthLayout;
