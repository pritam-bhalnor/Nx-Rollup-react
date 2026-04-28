import * as gql from 'gql-query-builder';
import { QueryBuilderOptions } from '../types';

export const useQueryGenerator = (metaData: QueryBuilderOptions) => {
  return gql.query({
    operation: metaData.operation,
    variables: metaData.variables,
    fields: metaData.fields,
  });
};

export const useMutationGeneratorFunction = () => {
  return (metaData: QueryBuilderOptions) => gql.mutation({
    operation: metaData.operation,
    variables: metaData.variables,
    fields: metaData.fields,
  });
};
