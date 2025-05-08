'use client';

import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';

import { FormInput } from '@/components/FormInput';
import { createChat as createChatService } from '@/app/services/chat';

type ChatForm = {
  message: string;
};

const defaultValues = {
  message: '',
};

export default function Chat() {
  const t = useTranslations('chat');
  const { data } = useSession();

  const { register, handleSubmit, formState } = useForm<ChatForm>({
    mode: 'onTouched',
    defaultValues,
  });

  const createChat = useMutation({
    mutationFn: createChatService,
    onSuccess: () => {
      // reset({ message: '' });
    },
  });

  const handleOnSubmit = async ({ message }: ChatForm) => {
    await createChat.mutate(message);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen px-10">
      <h1 className="text-3xl text-center font-semibold mb-2">
        {t('welcome', { name: data?.user.name })}
      </h1>
      <div className="flex items-center justify-between w-full max-w-5xl mt-4 gap-2">
        <FormInput
          {...register('message', { required: true })}
          disabled={createChat.isPending}
          label=""
        />
        <IconButton
          className="mt-2"
          onClick={handleSubmit(handleOnSubmit)}
          color="primary"
          loading={createChat.isPending}
          disabled={formState.isSubmitting || formState.isValidating}
        >
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
}
