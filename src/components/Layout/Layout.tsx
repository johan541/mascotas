import Head from 'next/head';
import { type FC, type PropsWithChildren, useEffect } from 'react';

import { NavBar } from '@/components/NavBar';

import styles from './Layout.module.scss';

type Props = {
  readonly title?: string;
} & PropsWithChildren;

const Layout: FC<Props> = ({ title, children }) => {
  const pageTitle = title && `${title} | `;
  const titleWithBrand = `${pageTitle || ''}Adopción de mascotas`;

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
        <title>{titleWithBrand}</title>
      </Head>
      <NavBar />
      {children}
    </>
  );
};

export default Layout;
