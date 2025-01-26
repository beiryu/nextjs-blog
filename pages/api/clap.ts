import { NextApiRequest, NextApiResponse } from 'next';
import { updateArticleClaps } from 'services/notion';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { pageId, newClaps } = req.body;
    await updateArticleClaps(pageId, newClaps);

    return res.status(200).json({ claps: newClaps });
  } catch (error) {
    console.error('Error handling clap:', error);

    if (error.message === 'Post not found') {
      return res.status(404).json({ message: 'Post not found' });
    }

    return res.status(500).json({ message: 'Internal server error' });
  }
}
