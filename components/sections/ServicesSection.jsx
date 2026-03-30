import SectionHeading from "@/components/shared/SectionHeading";
import { detailsSection, services } from "@/data/siteContent";
import styles from "./ServicesSection.module.css";

export default function ServicesSection() {
  return (
    <section id="services" className="section-shell">
      <div className={styles.headingWrap}>
        <SectionHeading
          compact
          label={detailsSection.label}
          title={detailsSection.title}
          copy={detailsSection.copy}
        />
      </div>

      <div className={styles.rows}>
        {services.map((service) => (
          <article key={service.number} className={styles.row} data-reveal>
            <p className={styles.number}>{service.number}</p>
            <div className={styles.titleBlock}>
              <h3>{service.title}</h3>
            </div>
            <p className={styles.summary}>{service.summary}</p>
            <p className={styles.outcome}>{service.outcome}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
