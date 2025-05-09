import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

import { FormInput } from '@/components/FormInput';
import { QUERY_KEYS } from '@/constants';
import { Error } from '@/types/error';
import {
  createPrompt as createPromptService,
  deletePrompt as deletePromptService,
} from '@/app/services/prompts';
import { Prompt } from '@/types/prompt';

type PromptForm = {
  prompt?: string;
};

const defaultValues = {
  prompt: '',
};

type PromptModalProps = {
  open: boolean;
  onClose: () => void;
  prompts?: Prompt[];
};

export default function PromptModal({
  open,
  onClose,
  prompts,
}: PromptModalProps) {
  const t = useTranslations('chat');

  const { register, handleSubmit, reset, formState } = useForm<PromptForm>({
    mode: 'onTouched',
    defaultValues,
  });

  const queryClient = useQueryClient();

  const addPrompt = useMutation({
    mutationFn: (newPrompt: string) => createPromptService(newPrompt),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROMPTS] });
      reset({ prompt: '' });
    },
  });

  const deletePrompt = useMutation({
    mutationFn: (id: string) => deletePromptService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROMPTS] });
    },
    onError: (error: Error) => {
      toast(t('modal.error', { error: error?.data.message }), {
        type: 'error',
      });
    },
  });

  const handleOnSubmit = ({ prompt: userPrompt }: PromptForm) =>
    addPrompt.mutate(userPrompt ?? '');

  const loading = useMemo(
    () => addPrompt.isPending || deletePrompt.isPending,
    [addPrompt.isPending, deletePrompt.isPending]
  );

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>{t('prompts.title')}</DialogTitle>
      <DialogContent>
        {prompts?.length ? (
          <div className="flex flex-wrap gap-2 mb-4">
            {prompts.map((prompt) => (
              <Chip
                key={prompt.id}
                label={prompt.prompt}
                onDelete={() => deletePrompt.mutate(prompt.id)}
                className="!mb-2"
                color="primary"
                variant="outlined"
              />
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-200 mb-4">
            {t('prompts.emptyState')}
          </p>
        )}
        <FormInput
          {...register('prompt', { required: true })}
          disabled={loading}
          placeholder={t('prompts.placeholder')}
          textarea
          label=""
        />
      </DialogContent>
      <DialogActions>
        <Button
          color="error"
          variant="outlined"
          onClick={onClose}
          fullWidth
          disabled={loading}
        >
          {t('prompts.close')}
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={handleSubmit(handleOnSubmit)}
          fullWidth
          loading={loading}
          disabled={!formState.isValid || loading}
        >
          {t('prompts.save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
