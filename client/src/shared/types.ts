
export interface IQuery {
  page?: number;
  limit?: number;
  dependencies?: boolean | string[];
  filter?: string;
  search?: string;
}

export interface IListForChange<T> {
  field: keyof T;
  value: any;
  add?: boolean;
}
