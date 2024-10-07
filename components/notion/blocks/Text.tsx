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
          bold ? 'font-bold' : '',
          italic ? 'italic' : '',
          code ? 'font-mono bg-gray-100 rounded px-1 py-0.5' : '',
          strikethrough ? 'line-through' : '',
          underline ? 'underline' : ''
        ].join(' ')}
        style={color !== 'default' ? { color } : {}}
      >
        {text?.link ? (
          <a className="text-blue-600 hover:underline" href={text.link.url}>
            {text.content}
          </a>
        ) : (
          text?.content
        )}
      </span>
    );
  });
}
