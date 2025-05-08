'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import Grid from '@mui/material/Grid2';

import { ROUTES } from '@/constants/routes';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace(ROUTES.CHAT);
    }
  }, [status, router]);

  return (
    <Grid container spacing={2} className="mb-4 h-screen !m-0">
      <Grid
        size={{ xs: 12, md: 6, lg: 7 }}
        className="flex items-center justify-center bg-brand-secondary-800 py-8"
      >
        <Image
          src="/login.png"
          width={500}
          height={500}
          alt="Picture of the author"
        />
      </Grid>
      <Grid container size={{ xs: 12, md: 6, lg: 5 }}>
        {children}
      </Grid>
    </Grid>
  );
}
