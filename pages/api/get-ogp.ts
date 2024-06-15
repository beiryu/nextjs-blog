import { JSDOM } from 'jsdom';
import type { NextApiRequest, NextApiResponse } from 'next';
import { OgpData } from 'types/opg-data.type';
import { isImageEndWithFormat } from 'utils/image';

async function getOgp(req: NextApiRequest, res: NextApiResponse<OgpData>) {
  // Receive and encode URL information from query parameters
  const { url } = req.query;
  const encodeURL = encodeURI(url as string);

  // Make a request to the encoded URL and extract opgData from the response
  try {
    const response = await fetch(encodeURL)
      .then(res => res.text())
      .then(text => {
        const dom = new JSDOM(text);

        // Get elements of meta tag and title tag
        const meta = dom.window.document.head.querySelectorAll('meta');
        const titleTag = dom.window.document.title;

        // Extract meta tags that have a string 'og:' in name or property
        const tagsContainingOg = Array.from(meta).filter((tag: any) => {
          const property = tag.getAttribute('property');
          const name = tag.getAttribute('name');
          const checkOg = (text: string) => text.substring(0, 3) === 'og:';

          return checkOg(property ?? '') || checkOg(name ?? '');
        });

        // extract OgpDate
        const ogp = tagsContainingOg.reduce((previous: any, tag: Element) => {
          // Determine property attribute or name attribute
          const attr = tag.hasAttribute('property')
            ? tag.getAttribute('property')
            : tag.getAttribute('name');

          // Use "og:image" etc. with "og:" removed as key
          const key = attr?.trim().replace('og:', '') ?? '';

          // Use content attribute as value
          const content = tag.getAttribute('content') ?? '';
          previous[key] = content;

          return previous;
        }, {});

        // Extract up to the first /, excluding "https://"
        const siteUrl = ogp['url'].substring(0, ogp['url'].indexOf('/', 8)) as string;

        // Preprocessing image url for educative.io site
        const imagePreprocess =
          isImageEndWithFormat(ogp['image']) && siteUrl.includes('educative')
            ? ogp['image'].substring(0, ogp['image'].lastIndexOf('.'))
            : ogp['image'];

        // Many sites seem to be able to get favicon at root/favicon.ico
        const faviconPath = '/favicon.ico';

        const ogpData: OgpData = {
          title: titleTag,
          description: ogp['description'] as string,
          faviconUrl: siteUrl + faviconPath,
          ogImgUrl: imagePreprocess as string,
          pageUrl: url as string
        };

        return ogpData;
      });

    // Extract and return title, description, ogImgUrl, faviconUrl, pageeUrl from returned data
    const { pageUrl, title, description, faviconUrl, ogImgUrl } = response;

    res.status(200).json({
      pageUrl,
      title,
      description,
      faviconUrl,
      ogImgUrl
    });
  } catch (error) {
    // Make sure that OgpDate type information is returned even when an error occurs
    res.status(200).json({
      title: "Sorry! It looks like I didn't get it well🙇‍♂️",
      description: '',
      faviconUrl: '',
      ogImgUrl: '',
      pageUrl: url as string
    });
  }
}

export default getOgp;
