import SectionHeading from "@/components/shared/SectionHeading";
import { galleryItems, gallerySection } from "@/data/siteContent";
import styles from "./GallerySection.module.css";

export default function GallerySection() {
  return (
    <section id="gallery" className="section-shell">
      <SectionHeading
        label={gallerySection.label}
        title={gallerySection.title}
        copy={gallerySection.copy}
      />

      <div className={styles.grid}>
        {galleryItems.map((item) => (
          <article
            key={item.title}
            className={styles.item}
            data-size={item.size}
            data-tone={item.tone}
            data-reveal
          >
            <div className={styles.artboard}>
              <span className={styles.formA} />
              <span className={styles.formB} />
            </div>
            <div className={styles.caption}>
              <h3>{item.title}</h3>
              <p>{item.note}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
