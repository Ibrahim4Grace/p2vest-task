import { User, UserRole } from '../models';

export enum Role {
  SYSTEM = 'system',
  USER = 'user',
  ASSITANT = 'assistant',
}

export interface EmailData {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export interface IUserSignUp {
  name: string;
  email: string;
  password: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface GoogleUserInfoType {
  sub: string;
  email: string;
  name: string;
  email_verified: boolean;
}

export interface JwtPayload {
  userId: string;
  role?: UserRole;
}

export interface IUserInterface {
  email: string;
  user_id: string;
  role?: string[];
}

export type UserResponsePayload = Pick<
  User,
  'id' | 'first_name' | 'last_name' | 'email'
> & {
  role: UserRole[];
};
