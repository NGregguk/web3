"use client";

import { useEffect } from "react";

export default function PageMotion() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const revealNodes = document.querySelectorAll("[data-reveal]");
    const heroNodes = document.querySelectorAll("[data-hero]");

    if (prefersReducedMotion) {
      [...revealNodes, ...heroNodes].forEach((node) => {
        node.style.opacity = "1";
        node.style.transform = "none";
      });
      return undefined;
    }

    let ctx;

    const run = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const heroItems = gsap.utils.toArray("[data-hero]");
        const revealItems = gsap.utils.toArray("[data-reveal]");

        gsap.fromTo(
          heroItems,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.08,
            delay: 0.15
          }
        );

        revealItems.forEach((item, index) => {
          gsap.fromTo(
            item,
            { autoAlpha: 0, y: 26 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              delay: index % 4 === 0 ? 0.05 : 0,
              scrollTrigger: {
                trigger: item,
                start: "top 84%",
                once: true
              }
            }
          );
        });
      });
    };

    run();

    return () => {
      ctx?.revert();
    };
  }, []);

  return null;
}
