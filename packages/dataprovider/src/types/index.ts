

export type QueryConfig = {
  sort?: Record<string, any>;
  filter?: Record<string, any>;
  pagination?: {
    page: number;
    pageSize: number;
  };
};

export type QueryBuilderOptions = {
  operation: string;
  fields?: any[];
  variables?: Record<string, any>;
  type?: 'query' | 'mutation';
};

export type QueryKeyType = {
  operationName?: string;
  fields?: any[];
  variables?: Record<string, any>;
  config?: QueryConfig;
  module?: string;
};
