import { OgpData } from 'components/notionBlocks/Bookmark';
import useSWR from 'swr';

export function useOgp(url: string) {
  const fetcher = (path: string) => fetch(path).then(res => res.json());
  const { data, error } = useSWR<OgpData>(`/api/getOgp?url=${url}`, fetcher);
  console.log(data, error);
  return { data, error };
}
