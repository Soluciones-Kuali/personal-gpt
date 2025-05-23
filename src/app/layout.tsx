import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { ToastContainer } from 'react-toastify';
import { getMessages } from 'next-intl/server';
import { SessionProvider } from 'next-auth/react';

import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import theme from '../theme';
import QueryProvider from './providers';

import './globals.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export const metadata: Metadata = {
  title: 'Personal GPT',
  description: 'Generated by David Gibrán',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <html lang="es">
      <body>
        <SessionProvider>
          <QueryProvider>
            <AppRouterCacheProvider>
              <ThemeProvider theme={theme}>
                <NextIntlClientProvider messages={messages}>
                  {children}
                </NextIntlClientProvider>
              </ThemeProvider>
            </AppRouterCacheProvider>
          </QueryProvider>
        </SessionProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
