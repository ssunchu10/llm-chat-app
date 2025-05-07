import React from "react";

interface NewChatIconProps {
  onClick?: () => void;
  className?: string;
}

const NewChatIcon: React.FC<NewChatIconProps> = ({ onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition ${className || ""}`}
      title="New Chat"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
      >
        <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
        <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
        <path d="M16 5l3 3" />
      </svg>
    </button>
  );
};

export default NewChatIcon;
