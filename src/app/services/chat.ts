import request from '@/utils/request';

export function createChat(message: string) {
  return request('/api/chat', {
    method: 'POST',
    body: { message },
  });
}
