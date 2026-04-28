import { GraphQLClient } from 'graphql-request';

export const customRequest = async <T>(
  client: GraphQLClient,
  query: string,
  variables?: any,
  module?: string
): Promise<T> => {
  if (module) {
    client.setHeader('module', module);
  }
  return client.request<T>(query, variables);
};

export const request = async <T>(
  client: GraphQLClient,
  query: string,
  variables?: any
): Promise<T> => {
  return client.request<T>(query, variables);
};
