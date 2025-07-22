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
      onClick={e => handleTagClick(tag.id)}
      className={`
        inline-flex items-center px-3 py-1 rounded-md text-xs font-medium
        border border-gray-300 cursor-pointer transition-all duration-200
        ${selectedTagId === tag.id ? 'ring-2 ring-gray-400' : ''}
      `}
    >
      <span className="flex items-center gap-1.5">
        {tag.name === 'Side hustle' && <BirdIcon size={12} />}
        {tag.name === 'AI' && <BrainCircuitIcon size={12} />}
        {tag.name === 'DevOps' && <ServerCogIcon size={12} />}
        {tag.name === 'Frontend' && <CodeIcon size={12} />}
        {tag.name === 'Backend' && <TerminalIcon size={12} />}
        {tag.name === 'Tutorials' && <BookOpenIcon size={12} />}
        {tag.name === 'Crypto' && <BitcoinIcon size={12} />}
        {tag.name === 'Architecture' && <NetworkIcon size={12} />}
        {tag.name === 'Personal Stories' && <UserRoundIcon size={12} />}
        {tag.name === 'Caching' && <DatabaseZapIcon size={12} />}
        {tag.name === 'Career' && <SquareGanttChartIcon size={12} />}
        {tag.name === 'AWS' && <ServerIcon size={12} />}
        {tag.name}
        {tag.number && <span className="text-xs opacity-70">({tag.number})</span>}
      </span>
    </div>
  );
}
