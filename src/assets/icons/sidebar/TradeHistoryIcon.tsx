import React from 'react';

interface TradeHistoryIconProps {
  color?: string; // Опциональное свойство для изменения цвета
}

const TradeHistoryIcon: React.FC<TradeHistoryIconProps> = ({color = '#4B5563'}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2400_749)">
        <path
          d="M10 20.777C9.12963 20.5796 8.2937 20.253 7.52002 19.808"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 3.22299C15.9882 3.67706 17.7632 4.79268 19.0347 6.3872C20.3061 7.98171 20.9984 9.96064 20.9984 12C20.9984 14.0393 20.3061 16.0183 19.0347 17.6128C17.7632 19.2073 15.9882 20.3229 14 20.777"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.57905 17.093C4.03356 16.3005 3.61925 15.4253 3.35205 14.501"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.12402 10.5C3.28402 9.54999 3.59202 8.64999 4.02402 7.82499L4.19302 7.51999"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.90698 4.57899C7.84264 3.93489 8.8923 3.47471 9.99998 3.22299"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 8V12L15 15"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2400_749">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
};

export default TradeHistoryIcon;
