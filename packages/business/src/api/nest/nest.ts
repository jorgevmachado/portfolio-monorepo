import { Http } from '@repo/services/http/http';
import type {
  INestConfig,
  ISignInParams,
  ISignUpParams,
  IUser,
} from './interface';

export class Nest extends Http {
  constructor({ baseUrl = 'http://localhost:3000', token = '' }: INestConfig) {
    super(baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json; charset=UTF-8',
      },
    });
  }

  public async signUp(params: ISignUpParams): Promise<string> {
    return this.post('auth/signUp', { body: params });
  }

  public async signIn(params: ISignInParams): Promise<{ token: string }> {
    return this.post('auth/signIn', { body: params });
  }

  public async getUser(id: string): Promise<IUser> {
    return this.get(`auth/${id}`);
  }
}