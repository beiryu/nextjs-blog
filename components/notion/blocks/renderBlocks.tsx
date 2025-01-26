import React, { Fragment } from 'react';
import Text from 'components/notion/blocks/Text';
import AnchorLink from 'components/notion/blocks/AnchorLink';
import CodeBlock from 'components/notion/blocks/CodeBlock';
import Callout from 'components/notion/blocks/Callout';
import YoutubeEmbed from 'components/notion/blocks/YoutubeEmbed';
import Bookmark from 'components/notion/blocks/Bookmark';
import File from 'components/notion/blocks/File';
import FallbackImage from 'components/common/FallbackImage';

export function renderBlocks(block) {
  const { type, id } = block;
  const value = block[type];

  switch (type) {
    case 'paragraph':
      return (
        <p className="text-xl leading-relaxed">
          <Text text={value.rich_text} />
        </p>
      );
    case 'heading_1':
      return (
        <div className="text-4xl font-bold mt-12 mb-4">
          <AnchorLink text={value.rich_text[0].plain_text}>
            <Text text={value.rich_text} />
          </AnchorLink>
        </div>
      );
    case 'heading_2':
      return (
        <div className="text-3xl font-bold mt-10 mb-3">
          <AnchorLink text={value.rich_text[0].plain_text}>
            <Text text={value.rich_text} />
          </AnchorLink>
        </div>
      );
    case 'heading_3':
      return (
        <div className="text-2xl font-bold mt-8 mb-3">
          <AnchorLink text={value.rich_text[0].plain_text}>
            <Text text={value.rich_text} />
          </AnchorLink>
        </div>
      );
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return (
        <>
          <li className="text-xl mb-0.5">
            <Text text={value.rich_text} />
          </li>
          <div className="max-w-4xl px-6 mx-auto mb-24 space-y-8 md:px-8">
            {block.children?.map(block => (
              <Fragment key={block.id}>{renderBlocks(block)}</Fragment>
            ))}
          </div>
        </>
      );
    case 'to_do':
      return (
        <div className="text-sm">
          <label htmlFor={id} className="flex items-center justify-start space-x-3">
            <input
              id={id}
              aria-describedby={value.rich_text}
              name={id}
              type="checkbox"
              checked={value?.checked}
              readOnly
              className="w-4 h-4 text-teal-500 border-gray-300 rounded focus:ring-teal-500"
            />
            <Text text={value.rich_text} />
          </label>
        </div>
      );
    case 'toggle':
      return (
        <details>
          <summary className="text-sm">
            <Text text={value.rich_text} />
          </summary>
          <div className="max-w-4xl px-6 mx-auto mb-24 space-y-8 md:px-8">
            {block.children?.map(block => (
              <Fragment key={block.id}>{renderBlocks(block)}</Fragment>
            ))}
          </div>
        </details>
      );
    case 'child_page':
      return <p>{value.title[0].plain_text}</p>;
    case 'image':
      const src = value.type === 'external' ? value.external.url : value.file.url;
      const caption = value.caption.length >= 1 ? value.caption[0].plain_text : '';
      return (
        <figure className="mt-0">
          <FallbackImage
            className="rounded-lg w-full mx-auto"
            src={src}
            alt={caption ? caption : 'A visual depiction of what is being written about'}
            width={2000}
            height={2000}
          />
          {caption && <figcaption className="text-center">{caption}</figcaption>}
        </figure>
      );
    case 'code':
      return (
        <CodeBlock
          language={value.language}
          caption={value.caption.length >= 1 && value.caption[0].plain_text}
          code={value.rich_text[0].plain_text}
        />
      );
    case 'callout':
      return (
        <Callout>
          {value.icon && <span className="text-2xl">{value.icon.emoji}</span>}
          <div className="leading-[28px] text-sm">
            <Text text={value.rich_text} />
          </div>
        </Callout>
      );
    case 'table_of_contents':
      return <div>TOC</div>;
    case 'video':
      return <YoutubeEmbed url={value?.external?.url || ''} />;
    case 'quote':
      return (
        <blockquote className="p-4 rounded-r-lg bg-gray-50 text-sm">
          <Text text={value.rich_text} />
        </blockquote>
      );
    case 'divider':
      return (
        <hr className="my-16 w-full border-none text-center h-10 before:content-['∿∿∿'] before:text-[#D1D5DB] before:text-2xl"></hr>
      );
    case 'bookmark':
      return <Bookmark url={value.url}></Bookmark>;
    case 'file':
      return <File file={value} />;
    case 'synced_block':
      return (
        <div className="flex flex-col items-center max-w-4xl mx-auto">
          {block.children?.map(block => (
            <Fragment key={block.id}>{renderBlocks(block)}</Fragment>
          ))}
        </div>
      );
    default:
      if (process.env.NODE_ENV === 'development') {
        return `❌ Unsupported block (${
          type === 'unsupported' ? 'unsupported by Notion API' : type
        })`;
      }
  }
}
