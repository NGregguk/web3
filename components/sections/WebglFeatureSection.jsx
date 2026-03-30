import SectionHeading from "@/components/shared/SectionHeading";
import WebglFeatureCanvas from "@/components/webgl/WebglFeatureCanvas";
import { webglFeatureSection } from "@/data/siteContent";
import styles from "./WebglFeatureSection.module.css";

export default function WebglFeatureSection() {
  return (
    <section id="webgl-stage" className="section-shell">
      <div className={styles.layout}>
        <div className={styles.copy}>
          <SectionHeading
            compact
            label={webglFeatureSection.label}
            title={webglFeatureSection.title}
            copy={webglFeatureSection.copy}
          />

          <div className={styles.notes}>
            {webglFeatureSection.notes.map((note) => (
              <article key={note.title} className={styles.note} data-reveal>
                <h3>{note.title}</h3>
                <p>{note.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.stage} data-reveal>
          <WebglFeatureCanvas />
          <div className={styles.stageMeta}>
            <p>{webglFeatureSection.stageLabel}</p>
            <span>{webglFeatureSection.stageNote}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
