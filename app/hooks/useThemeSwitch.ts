import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@app/store";
import { setTheme } from "@app/reducers/themeSlice";

export function useThemeSwitch() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.mode);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      document.documentElement.classList.toggle("dark", theme === "dark");
      localStorage.setItem("theme", theme);
    }
  }, [theme, hasMounted]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    dispatch(setTheme(nextTheme));
  };

  const setExplicitTheme = (value: "light" | "dark") => {
    dispatch(setTheme(value));
  };

  return {
    theme,
    hasMounted,
    toggleTheme,
    setExplicitTheme,
  };
}
