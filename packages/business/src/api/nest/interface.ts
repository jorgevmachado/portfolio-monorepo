import { EGender, ERole, EStatus } from './enum';

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