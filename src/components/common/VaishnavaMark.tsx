import React from 'react';

interface VaishnavaMarkProps {
  className?: string;
  size?: number;
}

export const VaishnavaMark: React.FC<VaishnavaMarkProps> = ({ className = '', size = 38 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="Vaishnava Thiruman Holy Mark"
    >
      {/* Golden Lotus Pedestal Base */}
      <path
        d="M24 43C16.5 43 13 41 12 39.5C14.5 38 18.5 37 24 37C29.5 37 33.5 38 36 39.5C35 41 31.5 43 24 43Z"
        fill="#C99A32"
      />
      <path
        d="M17 41C19.2 42.2 21.5 42.6 24 42.6C26.5 42.6 28.8 42.2 31 41C29 40 26.5 39.2 24 39.2C21.5 39.2 19 40 17 41Z"
        fill="#E5BE64"
      />

      {/* Outer White / Ivory Upright Prongs (Thiruman / Urdhva Pundra) */}
      {/* Left Wing */}
      <path
        d="M16 10C16 10 17.2 24 19 32C19.8 35.5 21.2 37.5 23 38C20.5 37.5 18 34.5 17 31C15 24 13.5 13 13.5 10C13.5 8.5 16 8.5 16 10Z"
        fill="#E6D3BA"
      />
      <path
        d="M15.2 10.5C15.2 10.5 16.5 24 18 31.5C18.6 34.2 19.8 36 21.5 36.8C19.8 36.2 17.5 33.8 16.8 30.5C15.2 23.5 13.8 12.5 13.8 10.5C13.8 9.5 15.2 9.5 15.2 10.5Z"
        fill="#FAF5EE"
      />

      {/* Right Wing */}
      <path
        d="M32 10C32 10 30.8 24 29 32C28.2 35.5 26.8 37.5 25 38C27.5 37.5 30 34.5 31 31C33 24 34.5 13 34.5 10C34.5 8.5 32 8.5 32 10Z"
        fill="#E6D3BA"
      />
      <path
        d="M32.8 10.5C32.8 10.5 31.5 24 30 31.5C29.4 34.2 28.2 36 26.5 36.8C28.2 36.2 30.5 33.8 31.2 30.5C32.8 23.5 34.2 12.5 34.2 10.5C34.2 9.5 32.8 9.5 32.8 10.5Z"
        fill="#FAF5EE"
      />

      {/* Central Vermilion / Red Stroke (Sri Churnam) */}
      <path
        d="M23 7.5C23 6.8 25 6.8 25 7.5C25 9.5 24.8 26 24.7 34C24.7 36 23.3 36 23.3 34C23.2 26 23 9.5 23 7.5Z"
        fill="#8B181B"
      />
      <path
        d="M23.5 8.5C23.5 8 24.5 8 24.5 8.5C24.5 10.5 24.3 26 24.3 33.5C24.3 34.5 23.7 34.5 23.7 33.5C23.7 26 23.5 10.5 23.5 8.5Z"
        fill="#BA2D32"
      />

      {/* Lotus Petal Ornaments on Base */}
      <circle cx="24" cy="40.5" r="1.2" fill="#8B181B" />
      <circle cx="19.5" cy="39.5" r="1" fill="#C99A32" />
      <circle cx="28.5" cy="39.5" r="1" fill="#C99A32" />
    </svg>
  );
};
