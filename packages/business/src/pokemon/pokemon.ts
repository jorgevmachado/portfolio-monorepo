import { Nest } from '../api';

export class Pokemon {
  private nestApi: Nest;

  constructor(baseUrl: string = 'http://localhost:3000', token: string = '') {
    this.nestApi = new Nest({ baseUrl, token });
  }
}
