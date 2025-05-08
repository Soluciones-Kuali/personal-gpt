'use client';

import { ReactNode, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import CircularProgress from '@mui/material/CircularProgress';

import { ROUTES } from '@/constants/routes';

interface ProtectedLayoutProps {
  children: ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace(ROUTES.LOGIN);
    }
  }, [status, router]);

  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress size="150px" />
      </div>
    );
  }

  return children;
}
