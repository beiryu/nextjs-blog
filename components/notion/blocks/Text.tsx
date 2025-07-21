import Link from 'next/link';

export default function Text({ text }) {
  if (!text) {
    return null;
  }
  return text.map((value, index) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text
    } = value;
    return (
      <span
        key={index}
        className={[
          bold ? 'font-semibold' : '',
          italic ? 'italic' : '',
          code ? 'font-mono bg-gray-100 rounded px-1 py-0.5' : '',
          strikethrough ? 'line-through' : '',
          underline ? 'underline' : ''
        ].join(' ')}
        style={color !== 'default' ? { color } : {}}
      >
        {text?.link ? (
          <Link
            className="text-gray-600 hover:text-gray-500 decoration-2 hover:underline focus:outline-none focus:underline opacity-80"
            href={text.link.url}
          >
            {text.content}
          </Link>
        ) : (
          text?.content
        )}
      </span>
    );
  });
}
