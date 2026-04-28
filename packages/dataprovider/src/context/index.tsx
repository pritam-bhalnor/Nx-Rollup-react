import React, { createContext, useContext } from 'react';
import { GraphQLClient } from 'graphql-request';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type QueryContextType = {
  cacheClient: GraphQLClient;
  client: GraphQLClient;
  uri: string;
};

const QueryContext = createContext<QueryContextType | undefined>(undefined);

export const useQueryContext = () => {
  const context = useContext(QueryContext);
  if (!context) {
    throw new Error('useQueryContext must be used within a QueryProvider');
  }
  return context;
};

const defaultQueryClient = new QueryClient();

export const QueryProvider: React.FC<{
  children: React.ReactNode;
  client: GraphQLClient;
  cacheClient?: GraphQLClient;
  uri: string;
  queryClient?: QueryClient;
}> = ({ children, client, cacheClient, uri, queryClient }) => {
  const value = {
    client,
    cacheClient: cacheClient || client,
    uri,
  };

  return (
    <QueryClientProvider client={queryClient || defaultQueryClient}>
      <QueryContext.Provider value={value}>
        {children}
      </QueryContext.Provider>
    </QueryClientProvider>
  );
};
