import request from '@/utils/request';
import { User, UserPayload } from '@/types/user';

export function createUser(product: UserPayload) {
  return request<User>('/api/users', {
    method: 'POST',
    body: product,
  });
}

export function editUser(id: string, product: UserPayload) {
  return request<User>(`/api/users/${id}`, {
    method: 'PUT',
    body: product,
  });
}

export function deleteUser(id: string) {
  return request(`/api/users/${id}`, {
    method: 'DELETE',
  });
}
