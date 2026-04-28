import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { QueryConfig, QueryBuilderOptions, QueryKeyType } from '../types';
import { useQueryContext } from '../context';
import { useQueryGenerator } from './useQueryGenerator';
import generateQueryKey from '../utils/generateQueryKey';
import { customRequest } from '../graphql/customClientRequest';

export type UseListProps<T> = {
  metaData: QueryBuilderOptions;
  config?: QueryConfig;
  queryOptions?: Omit<UseQueryOptions<T, Error, T, string[]>, 'queryKey' | 'queryFn'>;
  queryKey?: string[];
  module?: string;
};

export const useList = <T>(listProps: UseListProps<T>) => {
  const { metaData, config, queryOptions, queryKey, module } = listProps;

  const queryWithConfig: QueryBuilderOptions = {
    ...metaData,
    variables: {
      ...metaData?.variables,
      ...(config?.sort ? { sort: config?.sort } : {}),
      ...(config?.filter ? { where: config?.filter } : {}),
      ...(config?.pagination ? {
        start: (config.pagination.page - 1) * config.pagination.pageSize,
        limit: config.pagination.pageSize,
      } : {}),
    },
  };

  const isEnabled = Object.hasOwn(queryOptions ?? {}, 'enabled') ? queryOptions?.enabled : true;
  const generatedQuery = isEnabled ? useQueryGenerator(queryWithConfig) : { query: '', variables: {} };

  const { cacheClient: client, uri } = useQueryContext();

  const fetchData = async (): Promise<T> => customRequest<T>(client, generatedQuery.query, generatedQuery.variables, module || uri);

  const key = queryKey ?? generateQueryKey<QueryKeyType>({
    operationName: metaData?.operation,
    fields: metaData?.fields,
    variables: metaData?.variables,
    config,
    module: module ?? uri,
  });

  return useQuery({
    queryKey: key,
    queryFn: fetchData,
    ...queryOptions,
  });
};
