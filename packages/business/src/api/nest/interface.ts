import { EGender } from './enum';
import { ERole, EStatus } from '../../shared';

export interface INestConfig {
  baseUrl: string;
  token?: string;
}

export interface IUser {
  id: string;
  cpf: string;
  role: ERole;
  salt?: string;
  name: string;
  email: string;
  gender: EGender;
  status: EStatus;
  whatsup: string;
  picture?: string;
  password?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  date_of_birth: Date;
  recover_token?: string;
  confirmation_token?: string;
}