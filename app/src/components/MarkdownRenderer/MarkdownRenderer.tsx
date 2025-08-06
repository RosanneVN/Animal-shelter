import React from "react";
import './styles.css';

type Props = {
  content: string;
  className?: string;
};

const MarkdownRenderer = ({ content, className = "" }: Props) => {
  console.log("content", content);
  
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
