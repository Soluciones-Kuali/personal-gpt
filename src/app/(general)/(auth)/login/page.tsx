'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '@mui/material/Button';

import { FormInput } from '@/components/FormInput';
import { ROUTES } from '@/constants/routes';

type LoginForm = {
  email: string;
  password: string;
};

const defaultValues = {
  email: '',
  password: '',
};

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);

  const t = useTranslations('login');
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<LoginForm>({
    mode: 'onTouched',
    defaultValues,
  });

  const handleOnSubmit = async ({ email, password }: LoginForm) => {
    setLoading(true);
    const res = await signIn('credentials', {
      redirect: false,
      email: email,
      password: password,
    });

    if (res?.error) {
      setLoading(false);
      toast(t('error.description'), { type: 'error' });
    } else if (res?.ok) {
      router.replace(ROUTES.CHAT);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-10">
      <h1 className="text-3xl font-semibold mb-2">{t('title')}</h1>
      <FormInput
        {...register('email', { required: true })}
        className="!mb-10"
        label={t('email')}
      />
      <FormInput
        {...register('password', { required: true })}
        className="!mb-20"
        type="password"
        label={t('password')}
      />
      <Button
        variant="contained"
        className="w-full"
        size="large"
        color="primary"
        onClick={handleSubmit(handleOnSubmit)}
        disabled={!formState.isValid || loading}
        loading={loading}
      >
        {t('login')}
      </Button>
      <Button
        className="!mt-4"
        color="primary"
        onClick={() => router.push(ROUTES.REGISTER)}
        disabled={loading}
      >
        {t('register')}
      </Button>
    </div>
  );
}
