'use client';

import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import ProtectedLayout from '@/components/ProtectedLayout';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Logout from '@/icons/Logout';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations('menu');

  return (
    <ProtectedLayout>
      <div className="w-full h-screen">
        <div className="absolute">
          <ListItem onClick={() => signOut()}>
            <ListItemButton>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText primary={t('logout')} />
            </ListItemButton>
          </ListItem>
        </div>
        {children}
      </div>
    </ProtectedLayout>
  );
}
