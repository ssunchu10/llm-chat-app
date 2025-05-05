"use client";

import { JSX, useEffect, useState } from "react";
import { setTheme } from "../state/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@app/store";

interface SwitchOption {
  name: string;
  value: "light" | "dark";
  iconSvg: JSX.Element;
}

const SWITCH_DATA: SwitchOption[] = [
  {
    name: "Light",
    value: "light",
    iconSvg: (
      <svg
        className="size-5"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0-8 0m-5 0h1m8-9v1m8 8h1m-9 8v1M5.6 5.6l.7.7m12.1-.7l-.7.7m0 11.4l.7.7m-12.1-.7l-.7.7"
        ></path>
      </svg>
    ),
  },
  {
    name: "Dark",
    value: "dark",
    iconSvg: (
      <svg
        className="size-4"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3h.393a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 2.992z"
        ></path>
      </svg>
    ),
  },
];

const ThemeSwitch: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="w-fit">
      <div className="flex w-auto flex-row justify-center overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-700 sm:flex-row">
        {SWITCH_DATA.map((data) => (
          <button
            key={data.value}
            className={`flex items-center gap-2 px-4 py-2 text-black dark:text-white ${
              theme === data.value ? "bg-neutral-200 dark:bg-neutral-700" : ""
            }`}
            onClick={() => dispatch(setTheme(data.value as "light" | "dark"))}
          >
            {data.iconSvg}
            <h3 className="hidden sm:block">{data.name}</h3>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSwitch;
