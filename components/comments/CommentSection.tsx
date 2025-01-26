import { useState } from 'react';
import { useComments, useAddComment } from 'hooks/useComments';
import { getRelativeTimeString } from 'utils/datetime';

interface CommentSectionProps {
  articleId: string;
}

export default function CommentSection({ articleId }: CommentSectionProps) {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const { data: comments, isLoading } = useComments(articleId);

  const { mutateAsync: addComment, isPending: isAddingComment } = useAddComment();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !author.trim()) return;

    await addComment(
      {
        articleId,
        content,
        author
      },
      {
        onSuccess: () => {
          setContent('');
          setAuthor('');
        },
        onError: error => {
          console.error('Error adding comment:', error);
        }
      }
    );
  };

  return (
    <section className="py-8 lg:py-16 antialiased">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl lg:text-3xl font-bold text-gray-900">
            Discussion ({comments?.length || 0})
          </h2>
        </div>

        <form className="mb-12" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="author"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your nickname
            </label>
            <input
              id="author"
              type="text"
              value={author}
              onChange={e => setAuthor(e.target.value)}
              placeholder="Enter your nickname"
              className="w-full px-4 py-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 transition-all"
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="comment"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your comment
            </label>
            <textarea
              id="comment"
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={6}
              className="w-full p-4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 transition-all"
              placeholder="Share your thoughts..."
              required
            />
          </div>
          <button
            type="submit"
            disabled={isAddingComment}
            className="inline-flex items-center py-3 px-5 text-sm font-medium text-center bg-gray-900 text-white rounded-lg focus:ring-2 transition-all disabled:opacity-50 disabled:hover:bg-gray-500"
          >
            {isAddingComment ? 'Posting...' : 'Post comment'}
          </button>
        </form>

        {isLoading ? (
          <div className="flex justify-center items-center">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        ) : comments?.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No comments yet. Be the first to comment!
          </div>
        ) : (
          <div className="space-y-4">
            {comments?.map(comment => (
              <div
                key={comment.id}
                className="text-base bg-white rounded-lg border border-gray-200 p-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-gray-900 font-semibold">
                      {comment.author}
                    </p>
                    <p className="text-sm text-gray-600">
                      <time dateTime={comment.createdAt} title={comment.createdAt}>
                        {getRelativeTimeString(comment.createdAt)}
                      </time>
                    </p>
                  </div>
                </div>
                <p className="text-gray-500 whitespace-pre-wrap">{comment.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
