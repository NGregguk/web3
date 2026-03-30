"use client";

import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { templateConfig } from "@/data/templateConfig";

const ThemeContext = createContext({
  mounted: false,
  theme: "light",
  toggleTheme: () => {}
});

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  window.localStorage.setItem(templateConfig.themeStorageKey, theme);
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const currentTheme =
      document.documentElement.dataset.theme === "dark" ? "dark" : "light";

    setTheme(currentTheme);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
      return nextTheme;
    });
  };

  const value = useMemo(
    () => ({
      mounted,
      theme,
      toggleTheme
    }),
    [mounted, theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
