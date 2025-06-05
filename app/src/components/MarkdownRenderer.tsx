import React from "react";

type Props = {
  content: string;
  className?: string;
};

const MarkdownRenderer = ({ content, className = "" }: Props) => {
  return (
    <div 
      className={`markdown-content prose prose-sm max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
      style={{
        backgroundColor: 'transparent',
        color: 'inherit',
      }}
    />
  );
};

export default MarkdownRenderer;
