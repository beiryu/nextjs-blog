import { BookOpenIcon } from 'resources/icons/book-open';
import { CloudIcon } from 'resources/icons/cloud';
import { CommandLineIcon } from 'resources/icons/command-line';
import { ComputerDesktopIcon } from 'resources/icons/computer-desktop';
import { CurrencyDollarIcon } from 'resources/icons/currency-dollar';
import { DocumentDuplicateIcon } from 'resources/icons/document-duplicate';
import { LightBulbIcon } from 'resources/icons/light-bulb';
import { RocketLaunchIcon } from 'resources/icons/rocket-launch';
import { SiteHustleIcon } from 'resources/icons/site-hustle';
import { Square3Stack3dIcon } from 'resources/icons/square-3-stack-3d';
import { UserIcon } from 'resources/icons/user';
import { Category as CategoryType } from 'types/category.type';

interface ComponentProps {
  tag: CategoryType;
  selectedTagId?: string;
  setSelectedTagId?: (tagId: string) => void;
}

export default function Category(props: ComponentProps) {
  const { tag, selectedTagId, setSelectedTagId } = props;

  const handleTagClick = (tagId: string): void => {
    setSelectedTagId(selectedTagId === tagId ? null : tagId);
  };

  return (
    <div
      key={tag.id}
      onClick={() => handleTagClick(tag.id)}
      className={`${
        selectedTagId === tag.id && 'ring-2 ring-yellow-400 bg-yellow-100'
      } inline-flex items-center px-3 py-1.5 bg-slate-200 rounded-xl cursor-pointer hover:bg-yellow-100 gap-2 shadow-sm drop-shadow-lg`}
    >
      <div className="rounded-xl w-6 h-6 p-1 bg-amber-300 shadow-md">
        {tag.name === 'Side hustle' && <SiteHustleIcon />}
        {tag.name === 'AI' && <LightBulbIcon />}
        {tag.name === 'DevOps' && <CloudIcon />}
        {tag.name === 'Frontend' && <ComputerDesktopIcon />}
        {tag.name === 'Backend' && <CommandLineIcon />}
        {tag.name === 'Tutorials' && <BookOpenIcon />}
        {tag.name === 'Crypto' && <CurrencyDollarIcon />}
        {tag.name === 'Architecture' && <Square3Stack3dIcon />}
        {tag.name === 'Personal Stories' && <UserIcon />}
        {tag.name === 'Caching' && <DocumentDuplicateIcon />}
        {tag.name === 'Career' && <RocketLaunchIcon />}
      </div>
      <span className="text-sm font-medium">{tag.name || 'All'}</span>
      <span className="text-xs font-thin">{tag.number}</span>
    </div>
  );
}
