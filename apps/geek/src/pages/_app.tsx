import React, { useEffect } from 'react';

import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';

import { getAccessToken } from '../shared/cookies';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const pathname = usePathname();
  const router = useRouter();

  const isAuth = pathname.startsWith('/auth');
  const accessToken = getAccessToken();

  useEffect(() => {
    if (!accessToken && !isAuth) {
      router.push(`/auth/login?redirect_uri=${pathname}`);
      return;
    }
    if (accessToken && isAuth) {
      router.push('/');
    }
  }, [accessToken]);

  const getLayout = Component.getLayout ?? ((page) => <div>{page}</div>);

  return getLayout(<Component {...pageProps} />);
}
