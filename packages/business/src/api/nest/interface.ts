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
  name: string;
  email: string;
  gender: EGender;
  status: EStatus;
  whatsUp: string;
  picture?: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  dateOfBirth: Date;
}