import SectionHeading from "@/components/shared/SectionHeading";
import ObjectStudyCanvas from "@/components/webgl/ObjectStudyCanvas";
import { objectStudy } from "@/data/siteContent";
import styles from "./ObjectStudySection.module.css";

export default function ObjectStudySection() {
  return (
    <section id="object-study" className="section-shell">
      <div className={styles.layout}>
        <div className={styles.copy}>
          <SectionHeading
            compact
            label={objectStudy.label}
            title={objectStudy.title}
            copy={objectStudy.copy}
          />

          <div className={styles.notes}>
            {objectStudy.notes.map((note) => (
              <article key={note.title} className={styles.note} data-reveal>
                <h3>{note.title}</h3>
                <p>{note.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.stage} data-reveal>
          <ObjectStudyCanvas />
          <div className={styles.stageMeta}>
            <p>{objectStudy.stageLabel}</p>
            <span>{objectStudy.stageNote}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
