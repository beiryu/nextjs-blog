import { useMutation } from '@tanstack/react-query';

interface ClapMutationParams {
  pageId: string;
  newClaps: number;
}

const clapArticle = async ({ pageId, newClaps }: ClapMutationParams) => {
  const response = await fetch('/api/clap', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ pageId, newClaps })
  });

  return response.json();
};

export const useClap = () => {
  return useMutation({
    mutationFn: clapArticle
  });
};
