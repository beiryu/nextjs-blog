import { Client } from '@notionhq/client';
import { CONFIGS } from 'config';

const notion = new Client({
  auth: CONFIGS.notionSecret
});

export default notion;
