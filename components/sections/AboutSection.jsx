import SectionHeading from "@/components/shared/SectionHeading";
import { aboutNotes, aboutSection } from "@/data/siteContent";
import styles from "./AboutSection.module.css";

export default function AboutSection() {
  return (
    <section id="about" className="section-shell">
      <div className={styles.layout}>
        <SectionHeading
          compact
          label={aboutSection.label}
          title={aboutSection.title}
          copy={aboutSection.copy}
        />

        <div className={styles.statement} data-reveal>
          <p>{aboutSection.statement}</p>
        </div>

        <div className={styles.notes}>
          {aboutNotes.map((note) => (
            <article key={note.title} className={styles.note} data-reveal>
              <h3>{note.title}</h3>
              <p>{note.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
