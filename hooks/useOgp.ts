import useSWR from 'swr';
import { OgpData } from 'types/opg-data.type';

export function useOgp(url: string) {
  const fetcher = (path: string) => fetch(path).then(res => res.json());
  const { data, error } = useSWR<OgpData>(`/api/get-ogp?url=${url}`, fetcher);
  return { data, error };
}
