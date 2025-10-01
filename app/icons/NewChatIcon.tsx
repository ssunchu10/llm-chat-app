import React from "react";

interface NewChatIconProps {
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}

const NewChatIcon: React.FC<NewChatIconProps> = ({ onClick, className, ariaLabel }) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition ${className || ""}`}
      title={ariaLabel}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.91"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8 "
      >
        <path d="M18.68,1.48H5.32A3.82,3.82,0,0,0,1.5,5.3v9.54a3.82,3.82,0,0,0,3.82,3.82H9.14L12,21.52l2.86-2.86h3.82a3.82,3.82,0,0,0,3.82-3.82V5.3A3.82,3.82,0,0,0,18.68,1.48Z" />
        <polyline points="12.08 9.99 9.3 7.21 12.08 4.42" />
        <path d="M9.14,7.2H12A3.82,3.82,0,1,1,8.18,11" />
      </svg>
    </button>
  );
};

export default NewChatIcon;
