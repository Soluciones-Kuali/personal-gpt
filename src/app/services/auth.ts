import { User } from '@/types/user';
import request from '@/utils/request';

export function register(body: {
  email: string;
  name: string;
  password: string;
}) {
  return request<User>('/api/auth/register', {
    method: 'POST',
    body,
  });
}
