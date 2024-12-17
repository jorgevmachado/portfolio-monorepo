import { QueryParameters } from '@repo/business/shared/interface';

export interface ListParams {
  filters?: Array<FilterParams>;
  parameters?: QueryParameters;
  withDeleted?: boolean;
  withRelations?: boolean;
}

export interface FilterParams {
  value: string;
  param: string;
  condition: string;
}

export interface FindParams {
  withThrow?: boolean;
  searchParams: SearchParams;
  withDeleted?: boolean;
  withRelations?: boolean;
}

export interface SearchParams {
  by: TBy;
  value: string | number;
}

export type TBy =
  | 'id'
  | 'cpf'
  | 'order'
  | 'name'
  | 'email'
  | 'whatsUp'
  | 'accountId';

export interface FindOneParams<T> {
  order: number;
  response?: T;
  complete?: boolean;
  withThrow?: boolean;
}