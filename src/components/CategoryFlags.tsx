import React from 'react';

interface CategoryFlagProps {
  category: string;
  className?: string;
}

export const CategoryFlag: React.FC<CategoryFlagProps> = ({ category, className = '' }) => {
  const flags = {
    'italian': (
      <svg viewBox="0 0 640 480" className={className}>
        <g fillRule="evenodd" strokeWidth="1pt">
          <path fill="#fff" d="M0 0h640v480H0z"/>
          <path fill="#009246" d="M0 0h213.3v480H0z"/>
          <path fill="#ce2b37" d="M426.7 0H640v480H426.7z"/>
        </g>
      </svg>
    ),
    'japanese': (
      <svg viewBox="0 0 640 480" className={className}>
        <path fill="#fff" d="M0 0h640v480H0z"/>
        <circle cx="320" cy="240" r="120" fill="#bc002d"/>
      </svg>
    ),
    'brazilian': (
      <svg viewBox="0 0 640 480" className={className}>
        <path fill="#009c3b" d="M0 0h640v480H0z"/>
        <path fill="#ffdf00" d="M320 0l320 240-320 240L0 240z"/>
        <circle cx="320" cy="240" r="100" fill="#002776"/>
      </svg>
    ),
    'mexican': (
      <svg viewBox="0 0 640 480" className={className}>
        <g fillRule="evenodd" strokeWidth="1pt">
          <path fill="#006847" d="M0 0h640v480H0z"/>
          <path fill="#fff" d="M0 0h640v320H0z"/>
          <path fill="#ce1126" d="M0 0h640v160H0z"/>
          <g fill="#fcd116">
            <path d="M320 0l160 240-160 240L160 240z"/>
            <path d="M320 0l160 240-160 240L160 240z"/>
          </g>
        </g>
      </svg>
    ),
    'indian': (
      <svg viewBox="0 0 640 480" className={className}>
        <path fill="#f93" d="M0 0h640v160H0z"/>
        <path fill="#fff" d="M0 160h640v160H0z"/>
        <path fill="#128807" d="M0 320h640v160H0z"/>
        <circle cx="320" cy="240" r="80" fill="#008"/>
      </svg>
    )
  };

  return flags[category as keyof typeof flags] || null;
};