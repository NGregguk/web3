"use client";

import { useTheme } from "@/components/providers/ThemeProvider";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const { mounted, theme, toggleTheme } = useTheme();
  const nextMode = theme === "dark" ? "Light" : "Dark";

  return (
    <button
      className={styles.toggle}
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${nextMode.toLowerCase()} mode`}
    >
      <span className={styles.label}>Theme</span>
      <span className={styles.value}>{mounted ? nextMode : "Mode"}</span>
    </button>
  );
}
