import Head from 'next/head';
import { ToastContainer } from 'react-toastify';

import type { AppPropsWithLayout } from '@/types/next';

import 'normalize.css';
import 'react-toastify/dist/ReactToastify.min.css';
import '@/styles/globals.scss';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <meta name='description' content='Página adopción mascotas' />
        <meta name='author' content='Johan Garcia' />
        <meta name='robots' content='noindex' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='shortcut icon' href='favicon.svg' type='image/svg+xml' />
      </Head>

      {getLayout(<Component {...pageProps} />)}
      <ToastContainer />
    </>
  );
}
