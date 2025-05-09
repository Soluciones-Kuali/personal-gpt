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
import Slider from '@mui/material/Slider';
import CircularProgress from '@mui/material/CircularProgress';

import { FormInput } from '@/components/FormInput';
import { createChat as createChatService } from '@/app/services/chat';
import { getPrompts } from '@/app/services/prompts';
import { QUERY_KEYS } from '@/constants';
import { Typewriter } from '@/components/Typewriter';

import PromptModal from './PromptModal';

type ChatForm = {
  message: string;
};

const defaultValues = {
  message: '',
};

export default function Chat() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [temperature, setTemperature] = useState<number>(0.3);

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
    mutationFn: (message: string) =>
      createChatService({ message, temperature }),
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
        <div className="absolute w-full bottom-0 right-0 p-4">
          <div className="flex justify-between gap-2">
            <div className="w-1/3">
              <Slider
                defaultValue={0.3}
                step={0.1}
                marks={[
                  {
                    value: 0,
                    label: '0',
                  },
                  {
                    value: 1,
                    label: '1',
                  },
                  {
                    value: 2,
                    label: '2',
                  },
                ]}
                min={0}
                max={2}
                valueLabelDisplay="on"
                onChange={(e, value) => {
                  setTemperature(value as number);
                }}
              />
            </div>
            <Tooltip arrow title={t('prompts.title')}>
              <IconButton color="primary" onClick={() => setOpenModal(true)}>
                <Badge badgeContent={prompts.data?.length ?? 0} color="error">
                  <DynamicFormIcon />
                </Badge>
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <div className="mt-5">
          {createChat.isPending && (
            <div className="flex items-center justify-center">
              <CircularProgress size="30px" />
            </div>
          )}
          {createChat.isSuccess && (
            <Typewriter text={createChat.data as string} />
          )}
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
