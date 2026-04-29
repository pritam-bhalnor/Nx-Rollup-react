
import { QueryProvider, useList } from 'dataprovider';
import { GraphQLClient } from 'graphql-request';
// import { QueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';

const mockClient = new GraphQLClient('https://countries.trevorblades.com/graphql');

// Define UI Cache Rules
// const uiQueryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 1000 * 60 * 5, // Cache data is considered "fresh" for 5 minutes
//       gcTime: 1000 * 60 * 10,   // Keep inactive cached data in memory for 10 minutes
//       refetchOnWindowFocus: false, // Optional: Don't refetch on window focus
//     },
//   },
// });


const CountriesList = () => {
  const metaData = useMemo(() => ({
    operation: 'countries',
    fields: ['code', 'name', 'emoji'],
  }), []);

  const { data, isLoading, error } = useList({
    metaData,
    queryOptions: {
      staleTime: 1000 * 60 * 5, // explicitly set staleTime here to ensure it's applied
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div>
      <h2>Countries</h2>
      <ul>
        {(data as any)?.countries?.slice(0, 10).map((country: any) => (
          <li key={country.code}>
            {country.emoji} {country.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

// queryClient={uiQueryClient}

export const DummyDataPage = () => {
  return (
    <QueryProvider client={mockClient} uri="https://countries.trevorblades.com/graphql" >
      <div style={{ padding: '20px' }}>
        <h1>Data Provider Test Page</h1>
        <CountriesList />
      </div>
    </QueryProvider>
  );
};

export default DummyDataPage;
