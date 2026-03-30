import SectionHeading from "@/components/shared/SectionHeading";
import { caseStudies, wearSection } from "@/data/siteContent";
import styles from "./CaseStudiesSection.module.css";

export default function CaseStudiesSection() {
  return (
    <section id="case-studies" className="section-shell">
      <SectionHeading
        label={wearSection.label}
        title={wearSection.title}
        copy={wearSection.copy}
      />

      <div className={styles.list}>
        {caseStudies.map((study, index) => (
          <article
            key={study.name}
            className={`${styles.case} ${index % 2 === 1 ? styles.reverse : ""}`}
            data-reveal
          >
            <div className={styles.media} data-tone={study.tone}>
              <span className={styles.mediaPlate} />
              <span className={styles.mediaBlock} />
              <span className={styles.mediaOutline} />
              <span className={styles.mediaTag}>{study.category}</span>
            </div>

            <div className={styles.body}>
              <div className={styles.meta}>
                <p>{study.year}</p>
                <span>{study.category}</span>
              </div>
              <h3>{study.name}</h3>
              <p className={styles.summary}>{study.summary}</p>
              <dl className={styles.detailList}>
                <div>
                  <dt>{wearSection.primaryDetailLabel}</dt>
                  <dd>{study.deliverables}</dd>
                </div>
                <div>
                  <dt>{wearSection.secondaryDetailLabel}</dt>
                  <dd>{study.result}</dd>
                </div>
              </dl>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
