import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { Comment } from 'types/comment.type';

interface AddCommentParams {
  articleId: string;
  content: string;
  author: string;
}

const fetchComments = async (articleId: string): Promise<Comment[]> => {
  const response = await fetch(`/api/comments?articleId=${articleId}`);

  return response.json();
};

const addComment = async (params: AddCommentParams) => {
  const response = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  });

  return response.json();
};

export const useComments = (articleId: string) => {
  return useQuery({
    queryKey: ['comments', articleId],
    queryFn: () => fetchComments(articleId)
  });
};

export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addComment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['comments', variables.articleId]
      });
      toast.success('Comment added successfully');
    },
    onError: () => {
      toast.error('Failed to add comment');
    }
  });
};
