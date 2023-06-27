import { OgpData } from 'components/notion/blocks/Bookmark';
import useSWR from 'swr';

export function useOgp(url: string) {
  const fetcher = (path: string) => fetch(path).then(res => res.json());
  const { data, error } = useSWR<OgpData>(`/api/get-ogp?url=${url}`, fetcher);
  return { data, error };
}
