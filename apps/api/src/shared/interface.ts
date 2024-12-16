import { QueryParameters } from "@repo/business/shared/interface";

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

export interface SearchParams {
  by: string;
  value: string;
}