import SectionHeading from "@/components/shared/SectionHeading";
import { features, specificationsSection } from "@/data/siteContent";
import styles from "./FeaturesSection.module.css";

export default function FeaturesSection() {
  return (
    <section id="features" className="section-shell">
      <div className={styles.layout}>
        <SectionHeading
          compact
          label={specificationsSection.label}
          title={specificationsSection.title}
          copy={specificationsSection.copy}
        />

        <div className={styles.table} data-reveal>
          {features.map((feature) => (
            <div key={feature.label} className={styles.row}>
              <p>{feature.label}</p>
              <span>{feature.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
