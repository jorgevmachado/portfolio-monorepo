import { Http } from "@repo/services/http/http";
import { INestConfig } from "./interface";

export class Nest extends Http {
  constructor({baseUrl = 'http://localhost:3000', token = '' }: INestConfig) {
    super(baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json; charset=UTF-8'
      },
    });
  }
}