import { heroFacts, heroSection } from "@/data/siteContent";
import HeroCanvas from "@/components/webgl/HeroCanvas";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section id="top" className={`section-shell ${styles.section}`}>
      <div className={`section-grid ${styles.grid}`}>
        <div className={styles.copy} data-hero>
          <p className="eyebrow">{heroSection.eyebrow}</p>
          <h1 className={styles.title}>{heroSection.title}</h1>
          <p className={styles.body}>{heroSection.body}</p>
          <div className={styles.actions}>
            <a className={styles.primaryAction} href={heroSection.primaryAction.href}>
              {heroSection.primaryAction.label}
            </a>
            <a className="chip-link" href={heroSection.secondaryAction.href}>
              {heroSection.secondaryAction.label}
            </a>
          </div>
        </div>

        <div className={styles.stage} data-hero>
          <HeroCanvas />
          <div className={styles.stageNote}>
            <p>{heroSection.stageLabel}</p>
            <span>{heroSection.stageNote}</span>
          </div>
        </div>

        <div className={styles.facts} data-hero>
          {heroFacts.map((fact) => (
            <article key={fact.label} className={styles.fact}>
              <p className={styles.factLabel}>{fact.label}</p>
              <p className={styles.factValue}>{fact.value}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
