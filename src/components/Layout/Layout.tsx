import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { type FC, type PropsWithChildren, useEffect } from 'react';

import { NavBar } from '@/components/NavBar';
import { titleWithBrand } from './commons';

import styles from './Layout.module.scss';

type Props = {
  readonly title?: string;
} & PropsWithChildren;

const Layout: FC<Props> = ({ title = '', children }) => {
  const { status } = useSession();

  useEffect(() => {
    const rootElement = document.getElementById('__next');
    rootElement?.classList.add(styles.layout);

    return () => {
      rootElement?.classList.remove(styles.layout);
    };
  }, []);

  return (
    <>
      <Head>
        <title>{titleWithBrand(title)}</title>
      </Head>
      <NavBar sessionStatus={status} />
      {children}
    </>
  );
};

export default Layout;
