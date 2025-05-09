import request from '@/utils/request';

export function createChat({
  message,
  temperature,
}: {
  message: string;
  temperature: number;
}) {
  return request('/api/chat', {
    method: 'POST',
    body: { message, temperature },
  });
}
