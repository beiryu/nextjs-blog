/* eslint-disable @next/next/no-img-element */
import { Loading } from 'components/common/Loading';
import { useOgp } from 'hooks/useOgp';

export type OgpData = {
  pageUrl: string;
  title: string;
  description: string;
  faviconUrl: string;
  ogImgUrl: string;
};

interface BookmarkViewProps {
  ogp: OgpData;
}

// Presentational Component for Desktop
export const BookmarkViewDesktop = ({ ogp }: BookmarkViewProps) => {
  const { title, description, faviconUrl, pageUrl, ogImgUrl } = ogp;
  const w = ogImgUrl ? 'w-3/5' : 'w-full';
  const ml = faviconUrl ? 'ml-2' : '';

  return (
    <a href={pageUrl} target="_blank" rel="noreferrer" className="hidden md:block">
      <article className="flex justify-between h-40 rounded-lg border border-opacity-40 border-solid">
        <div className={`flex flex-col justify-between p-5  hover:bg-gray-100 ${w}`}>
          <h3 className="text-xl truncate">{title}</h3>
          <p className="overflow-hidden h-12 text-base text-gray-500">{description}</p>
          <div className="flex items-center">
            {faviconUrl && <img src={faviconUrl} className="h-6" alt="" />}
            <p className={`text-base truncate ${ml}`}>{pageUrl}</p>
          </div>
        </div>
        {ogImgUrl && (
          <div className="w-2/5 h-full rounded-lg overflow-hidden">
            <img src={ogImgUrl} className="object-cover w-full h-full" alt="" />
          </div>
        )}
      </article>
    </a>
  );
};

// Presentational Component for Mobile
export const BookmarkViewMobile = ({ ogp }: BookmarkViewProps) => {
  const { title, description, faviconUrl, pageUrl, ogImgUrl } = ogp;

  const ml = faviconUrl ? 'ml-2' : '';

  return (
    <a href={pageUrl} target="_blank" rel="noreferrer" className="md:hidden">
      <article className="flex flex-col justify-between rounded-lg border border-opacity-40 border-solid">
        {ogImgUrl && (
          <div className="object-cover w-full h-40 rounded-lg overflow-hidden">
            <img src={ogImgUrl} className="object-cover w-full h-full" alt="" />
          </div>
        )}
        <div
          className={`flex flex-col justify-between p-5 h-40  hover:bg-gray-100 w-full`}
        >
          <h3 className="text-xl truncate">{title}</h3>
          <p className="overflow-hidden h-12 text-base text-gray-500">{description}</p>
          <div className="flex items-center">
            {faviconUrl && <img src={faviconUrl} className="h-6" alt="" />}
            <p className={`text-base truncate ${ml}`}>{pageUrl}</p>
          </div>
        </div>
      </article>
    </a>
  );
};

// Presentational Component Container
const BookmarkView = ({ ogp }: BookmarkViewProps) => (
  <>
    <BookmarkViewMobile ogp={ogp} />
    <BookmarkViewDesktop ogp={ogp} />
  </>
);

export default function Bookmark({ url }: { url: string }) {
  const { data, error } = useOgp(url);

  if (!data) return <Loading />;

  return <BookmarkView ogp={data} />;
}
