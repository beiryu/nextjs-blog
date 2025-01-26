import { Category as CategoryType } from 'types/category.type';
import {
  BirdIcon,
  BitcoinIcon,
  BookOpenIcon,
  BrainCircuitIcon,
  CodeIcon,
  DatabaseZapIcon,
  NetworkIcon,
  ServerCogIcon,
  SquareGanttChartIcon,
  TerminalIcon,
  UserRoundIcon,
  ServerIcon
} from 'lucide-react';

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
        selectedTagId === tag.id && 'ring-2 ring-slate-400 bg-slate-100'
      } inline-flex items-center px-3 py-1.5 mr-2 bg-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 gap-2 shadow-sm drop-shadow-lg w-fit`}
    >
      <div className="rounded-xl w-6 h-6 p-1 bg-orange-100 shadow-md flex justify-center items-center">
        {tag.name === 'Side hustle' && <BirdIcon />}
        {tag.name === 'AI' && <BrainCircuitIcon />}
        {tag.name === 'DevOps' && <ServerCogIcon />}
        {tag.name === 'Frontend' && <CodeIcon />}
        {tag.name === 'Backend' && <TerminalIcon />}
        {tag.name === 'Tutorials' && <BookOpenIcon />}
        {tag.name === 'Crypto' && <BitcoinIcon />}
        {tag.name === 'Architecture' && <NetworkIcon />}
        {tag.name === 'Personal Stories' && <UserRoundIcon />}
        {tag.name === 'Caching' && <DatabaseZapIcon />}
        {tag.name === 'Career' && <SquareGanttChartIcon />}
        {tag.name === 'AWS' && <ServerIcon />}
      </div>
      <span className="text-sm font-medium">{tag.name || 'All'}</span>
      <span className="text-xs font-thin">{tag.number}</span>
    </div>
  );
}
