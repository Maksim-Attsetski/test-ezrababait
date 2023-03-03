
export interface IQuery {
  page?: number;
  limit?: number;
  dependencies?: boolean | string[];
  filter?: string;
  search?: string;
}

export interface IListForChange {
  field: string;
  value: any;
  add?: boolean;
}
