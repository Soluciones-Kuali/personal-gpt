import { usersAttributes } from '@/models/users';

export type User = Omit<usersAttributes, 'hashed_password'>;

export type UserPayload = {
  email: string;
  name: string;
  shop_name?: string;
  password: string;
  passwordConfirmation?: string;
};
