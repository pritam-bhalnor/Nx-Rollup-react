
import { QueryProvider, useList } from 'dataprovider';
import { GraphQLClient } from 'graphql-request';

const mockClient = new GraphQLClient('https://countries.trevorblades.com/graphql');

const CountriesList = () => {
  const { data, isLoading, error } = useList({
    metaData: {
      operation: 'countries',
      fields: ['code', 'name', 'emoji'],
    },
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

export const DummyDataPage = () => {
  return (
    <QueryProvider client={mockClient} uri="https://countries.trevorblades.com/graphql">
      <div style={{ padding: '20px' }}>
        <h1>Data Provider Test Page</h1>
        <CountriesList />
      </div>
    </QueryProvider>
  );
};

export default DummyDataPage;
