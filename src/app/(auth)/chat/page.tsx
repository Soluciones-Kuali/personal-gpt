'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';

import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';

import { FormInput } from '@/components/FormInput';
import { createChat as createChatService } from '@/app/services/chat';
import { getPrompts } from '@/app/services/prompts';
import { QUERY_KEYS } from '@/constants';

import PromptModal from './PromptModal';

type ChatForm = {
  message: string;
};

const defaultValues = {
  message: '',
};

export default function Chat() {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const t = useTranslations('chat');
  const { data } = useSession();

  const { register, handleSubmit, formState } = useForm<ChatForm>({
    mode: 'onTouched',
    defaultValues,
  });

  const prompts = useQuery({
    queryKey: [QUERY_KEYS.PROMPTS],
    queryFn: () => getPrompts(),
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
    <>
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
        <div className="absolute bottom-0 right-0 p-4">
          <Tooltip arrow title={t('prompts.title')}>
            <IconButton color="primary" onClick={() => setOpenModal(true)}>
              <Badge badgeContent={prompts.data?.length ?? 0} color="error">
                <DynamicFormIcon />
              </Badge>
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <PromptModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        prompts={prompts.data}
      />
    </>
  );
}
