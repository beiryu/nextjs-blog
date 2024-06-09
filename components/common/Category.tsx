import { COLOR_MAPPER } from 'constants/color';
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
      <div className={`rounded-xl w-4 h-4 ${COLOR_MAPPER[tag.color]}`}></div>
      <span className="text-xs font-medium">{tag.name || 'All'}</span>
    </div>
  );
}
