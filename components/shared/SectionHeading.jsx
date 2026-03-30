import styles from "./SectionHeading.module.css";

export default function SectionHeading({ label, title, copy, compact = false }) {
  return (
    <div className={`${styles.heading} ${compact ? styles.compact : ""}`} data-reveal>
      <p className={styles.label}>{label}</p>
      <h2 className={styles.title}>{title}</h2>
      {copy ? <p className={styles.copy}>{copy}</p> : null}
    </div>
  );
}
