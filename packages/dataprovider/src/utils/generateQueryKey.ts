export default function generateQueryKey<T>(params: T): string[] {
  return [JSON.stringify(params)];
}
