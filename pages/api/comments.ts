import { NextApiRequest, NextApiResponse } from 'next';
import { addComment, getComments } from 'services/notion';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { articleId } = req.query;
      const comments = await getComments(articleId as string);
      return res.status(200).json(comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { articleId, content, author } = req.body;
      await addComment(articleId, {
        content,
        author,
        articleId,
        createdAt: new Date().toISOString()
      });
      return res.status(201).json({ message: 'Comment added successfully' });
    } catch (error) {
      console.error('Error adding comment:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
