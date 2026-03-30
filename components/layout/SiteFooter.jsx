import { footerContent, footerLinks } from "@/data/siteContent";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandBlock}>
          <p className={styles.kicker}>{footerContent.kicker}</p>
          <p className={styles.statement}>{footerContent.statement}</p>
        </div>

        <div className={styles.linkBlock}>
          {footerLinks.map((link) => (
            <a key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </a>
          ))}
        </div>

        <p className={styles.meta}>{footerContent.meta}</p>
      </div>
    </footer>
  );
}
