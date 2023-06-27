import Link from 'next/link';
import Text from './Text';

export default function File({ file }) {
  if (!file) {
    return null;
  }

  return (
    <div className="h-full">
      <Link target="_blank" className="text-gray-700 underline" href={file.file.url}>
        <Text text={file.caption}></Text>
      </Link>
    </div>
  );
}
