import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { QueryBuilderOptions, QueryKeyType } from '../types';
import { useQueryContext } from '../context';
import { useMutationGeneratorFunction } from './useQueryGenerator';
import { request } from '../graphql/customClientRequest';
import generateQueryKey from '../utils/generateQueryKey';

export type MutateProps = {
  taskIdentifier?: string;
  values?: any;
};

export type UseCreateProps = {
  metaData: QueryBuilderOptions;
  queryOptions?: Omit<UseMutationOptions<any, Error, MutateProps | undefined, unknown>, 'mutationKey' | 'mutationFn'>;
  module?: string;
};

export const useCrud = <T>(listProps: UseCreateProps) => {
  const { metaData, queryOptions } = listProps;

  const generateMutation = useMutationGeneratorFunction();
  const { client } = useQueryContext();

  const fetchData = async (newVar?: MutateProps) => {
    const { query, variables } = generateMutation(metaData);
    const updatedVar: Record<string, any> = { ...variables };

    if (newVar?.taskIdentifier && newVar.values) {
      updatedVar[newVar.taskIdentifier] = {
        ...variables?.[newVar.taskIdentifier],
        ...newVar.values,
      };
    }

    return request<T>(client, query, updatedVar);
  };

  const key = generateQueryKey<QueryKeyType>({ operationName: metaData.operation, fields: metaData.fields });

  return useMutation({
    mutationKey: key,
    mutationFn: fetchData,
    ...queryOptions,
  });
};
