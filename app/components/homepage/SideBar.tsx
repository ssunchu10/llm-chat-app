"use client";

import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useChatHeader } from "@app/hooks/useChatHeader";
import BrainIcon from "@app/icons/BrainIcon";
import { on } from "events";

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SideBar({ isOpen, onClose }: SideBarProps) {
  const { data: session, status } = useSession();
  const { resetChat } = useChatHeader();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="h-full w-80 bg-white dark:bg-gray-800 shadow-lg">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-2">
          <button
            onClick={() => { resetChat(); onClose(); }}
            className="flex justify-center items-center gap-2 p-0 m-0 bg-transparent border-none cursor-pointer"
            aria-label="Reset chat"
            type="button"
          >
            <BrainIcon className="text-violet-600 dark:text-violet-400" />
            <span className="text-sm sm:text-xl font-bold text-gray-900 dark:text-white">Nova</span>
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
            aria-label="Close sidebar"
          >
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => { resetChat(); onClose(); }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900/20 text-purple-700 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/30 transition-colors"
          >
            <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <span className="text-sm font-medium">New chat</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-3">
            <div className="flex items-center gap-2 mb-3">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Recents</h3>
            </div>
          </div>
          
          <div className="px-4">
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors">
                <p className="text-sm text-gray-900 dark:text-white">
                  Previous conversation 1
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  2 hours ago
                </p>
              </div>
              <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors">
                <p className="text-sm text-gray-900 dark:text-white">
                  Previous conversation 2
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  1 day ago
                </p>
              </div>
              <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors">
                <p className="text-sm text-gray-900 dark:text-white">
                  Previous conversation 3
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  3 days ago
                </p>
              </div>
            </div>
          </div>
        </div>

        {status === "authenticated" && session?.user && (
          <div className={`border-t border-gray-200 dark:border-gray-700 relative`}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                showUserMenu ? "bg-gray-100 dark:bg-gray-600" : ""
              }`}
            >
              <div className="flex-shrink-0">
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {session.user.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {session.user.name || "User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  Free plan
                </p>
              </div>
              <div className="flex-shrink-0">
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    showUserMenu ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute bottom-full left-4 right-4 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {session.user.email}
                  </p>
                </div>

                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 cursor-pointer hover:bg-gray-400 dark:text-gray-300 dark:hover:bg-gray-900 transition-colors">
                  Settings
                </button>

                <button
                  onClick={() =>
                    signOut({ callbackUrl: "/log-in-or-create-account" })
                  }
                  className="w-full px-4 py-2 text-left text-sm text-red-600 cursor-pointer dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
