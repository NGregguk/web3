import { IBM_Plex_Sans, Syne } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { templateConfig } from "@/data/templateConfig";
import "./globals.css";

const display = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "700", "800"]
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"]
});

const themeScript = `
  (() => {
    const storageKey = "${templateConfig.themeStorageKey}";
    const storedTheme = window.localStorage.getItem(storageKey);
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = storedTheme || (systemDark ? "dark" : "light");
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  })();
`;

export const metadata = templateConfig.metadata;

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ece7df" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f10" }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${body.variable}`}>
        <Script id="theme-script" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <a className="skipLink" href="#content">
          Skip to content
        </a>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
