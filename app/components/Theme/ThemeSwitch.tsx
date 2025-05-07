"use client";

import { JSX, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@app/store";
import { setTheme } from "@app/reducers/themeSlice";
import LightIcon from "../Icons/LightIcon";
import DarkIcon from "../Icons/DarkIcon";

interface SwitchOption {
  name: string;
  value: "light" | "dark";
  iconSvg: JSX.Element;
}

const SWITCH_DATA: SwitchOption[] = [
  {
    name: "Light",
    value: "light",
    iconSvg: <LightIcon />,
  },
  {
    name: "Dark",
    value: "dark",
    iconSvg: <DarkIcon />,
  },
];


const ThemeSwitch: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.mode);
  const [hasMounted, setHasMounted] = useState(false);

  const currentTheme = SWITCH_DATA.find((t) => t.value === theme)!;
  const nextTheme = theme === "dark" ? "light" : "dark";
  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      document.documentElement.classList.toggle("dark", theme === "dark");
      localStorage.setItem("theme", theme);
    }
  }, [theme, hasMounted]);

  if (!hasMounted) {
    return <div className="w-[120px] h-[40px] sm:flex hidden" />;
  }

  return (
    <div className="w-fit">
      <button
        onClick={() => dispatch(setTheme(nextTheme))}
        title={`Switch to ${nextTheme} mode`}
        className="block sm:hidden p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
      >
        {currentTheme.iconSvg}
      </button>

      <div className="hidden sm:flex w-auto flex-row justify-center overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-700">
        {SWITCH_DATA.map((data: SwitchOption) => (
          <button
            key={data.value}
            title={data.name + " mode"}
            className={`flex items-center cursor-pointer gap-2 px-4 py-2 text-black dark:text-white transition-all duration-200 ease-in-out hover:bg-neutral-300 dark:hover:bg-neutral-800 hover:scale-105
              ${theme === data.value ? "bg-neutral-200 dark:bg-neutral-700" : ""}`}
            onClick={() => dispatch(setTheme(data.value))}
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
