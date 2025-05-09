'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '@mui/material/Button';

import { FormInput } from '@/components/FormInput';
import { ROUTES } from '@/constants/routes';
import { register as registerService } from '@/app/services/auth';

type RegisterForm = {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
};

const defaultValues = {
  email: '',
  name: '',
  password: '',
  passwordConfirmation: '',
};

export default function Register() {
  const [loading, setLoading] = useState<boolean>(false);

  const t = useTranslations('register');
  const router = useRouter();
  const { register, handleSubmit, control, formState } = useForm<RegisterForm>({
    mode: 'onTouched',
    defaultValues,
  });

  const password = useWatch({ name: 'password', control });

  const handleOnSubmit = async ({ email, name, password }: RegisterForm) => {
    setLoading(true);

    try {
      await registerService({
        email,
        name,
        password,
      });

      const res = await signIn('credentials', {
        redirect: false,
        email: email,
        password: password,
      });

      if (res?.error) {
        setLoading(false);
        toast(t('error.title', { error: res?.error }), { type: 'error' });
      } else if (res?.ok) {
        router.replace(ROUTES.CHAT);
      }
    } catch (error) {
      setLoading(false);
      toast(t('error.title', { error: String(error) }), { type: 'error' });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-10">
      <h1 className="text-3xl font-semibold mb-2">{t('title')}</h1>
      <FormInput
        {...register('email', { required: true })}
        className="!mb-8"
        label={t('email')}
      />
      <FormInput
        {...register('name', { required: true })}
        className="!mb-8"
        label={t('name')}
      />
      <FormInput
        {...register('password', { required: true })}
        className="!mb-8"
        type="password"
        label={t('password')}
        autoComplete="new-password"
      />
      <FormInput
        {...register('passwordConfirmation', {
          required: true,
          validate: (value) => {
            if (value && value !== password)
              return t('error.passwordConfirmation');

            return true;
          },
        })}
        className="!mb-20"
        type="password"
        label={t('confirmPassword')}
        autoComplete="new-password"
        error={
          formState.errors.passwordConfirmation?.type === 'validate'
            ? t('error.passwordConfirmation')
            : undefined
        }
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
        {t('register')}
      </Button>
      <Button
        className="!mt-4"
        color="primary"
        onClick={() => router.push(ROUTES.LOGIN)}
        disabled={loading}
      >
        {t('login')}
      </Button>
    </div>
  );
}
