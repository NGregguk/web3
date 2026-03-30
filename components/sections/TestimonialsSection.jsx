import SectionHeading from "@/components/shared/SectionHeading";
import { reviewsSection, testimonials } from "@/data/siteContent";
import styles from "./TestimonialsSection.module.css";

export default function TestimonialsSection() {
  const [featured, ...rest] = testimonials;

  return (
    <section id="testimonials" className="section-shell">
      <div className={styles.top}>
        <SectionHeading
          compact
          label={reviewsSection.label}
          title={reviewsSection.title}
          copy={reviewsSection.copy}
        />
      </div>

      <div className={styles.layout}>
        <blockquote className={styles.featured} data-reveal>
          <p>{featured.quote}</p>
          <footer>
            <strong>{featured.name}</strong>
            <span>{featured.role}</span>
          </footer>
        </blockquote>

        <div className={styles.list}>
          {rest.map((item) => (
            <blockquote key={item.name} className={styles.card} data-reveal>
              <p>{item.quote}</p>
              <footer>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
