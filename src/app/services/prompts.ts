import { Prompt } from '@/types/prompt';
import request from '@/utils/request';

export function getPrompts() {
  return request<Prompt[]>('/api/prompts', {
    method: 'GET',
  });
}

export function createPrompt(prompt: string) {
  return request<Prompt>('/api/prompts', {
    method: 'POST',
    body: { prompt },
  });
}

export function deletePrompt(id: string) {
  return request(`/api/prompts/${id}`, {
    method: 'DELETE',
  });
}
