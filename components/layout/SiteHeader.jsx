import { headerContent, navLinks } from "@/data/siteContent";
import { templateConfig } from "@/data/templateConfig";
import ThemeToggle from "@/components/shared/ThemeToggle";
import styles from "./SiteHeader.module.css";

export default function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a
          className={styles.brand}
          href="#top"
          aria-label={templateConfig.brand.homeAriaLabel}
        >
          <span>{templateConfig.brand.name}</span>
          <small>{templateConfig.brand.subline}</small>
        </a>

        <nav className={styles.nav} aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <a className={styles.cta} href={headerContent.ctaHref}>
            {headerContent.ctaLabel}
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
