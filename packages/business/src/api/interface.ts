import { ERole, EStatus } from './enum';


export interface ResponsePaginate<T> {
  next: string;
  count: number;
  results: Array<T>;
  previous: string;
}

export interface Paginate<T> {
  skip: number;
  next: number;
  prev: number;
  total: number;
  pages: number;
  results: Array<T>;
  per_page: number;
  current_page: number;
}

export interface QueryParameters {
  all?: boolean;
  asc?: string;
  desc?: string;
  page?: number;
  name?: string;
  role?: ERole;
  limit?: number;
  status?: EStatus;
  withDeleted?: boolean;
}