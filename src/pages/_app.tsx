import Head from 'next/head';

import type { AppPropsWithLayout } from '@/types/next';

import 'normalize.css';
import '@/styles/globals.scss';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <meta name='description' content='Pagina adopción mascotas' />
        <meta name='author' content='Johan Garcia' />
        <meta name='robots' content='noindex' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>

      {getLayout(<Component {...pageProps} />)}
    </>
  );
}
