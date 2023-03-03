
export interface IQuery {
  page?: number;
  limit?: number;
  dependencies?: boolean | string[];
  filter?: string;
  search?: string;
}