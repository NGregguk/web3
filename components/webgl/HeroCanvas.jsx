"use client";

import { useEffect, useState } from "react";
import { templateConfig } from "@/data/templateConfig";
import styles from "./HeroCanvas.module.css";

function SceneLoading() {
  return (
    <div className={styles.fallback}>
      <div className={styles.fallbackFrame} />
      <div className={styles.fallbackBand} />
    </div>
  );
}

function HeroFallback({ reducedMotion }) {
  return (
    <div className={styles.fallback}>
      <div className={styles.fallbackFrame} />
      <div className={styles.fallbackBand} />
      <div className={styles.fallbackOutline} />
      <p className={styles.fallbackLabel}>
        {reducedMotion ? "Static hero for reduced motion" : "Hero media fallback"}
      </p>
    </div>
  );
}

export default function HeroCanvas() {
  const [mounted, setMounted] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    setMounted(true);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduceMotion(reduced);
  }, []);

  const showVideo = mounted && !reduceMotion && !videoFailed;

  return (
    <figure className={styles.shell}>
      <figcaption className={styles.srOnly}>
        {templateConfig.heroMedia.figcaption}
      </figcaption>
      {showVideo ? (
        <>
          {!videoReady ? <SceneLoading /> : null}
          <video
            className={styles.video}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
            onCanPlay={() => setVideoReady(true)}
            onError={() => setVideoFailed(true)}
          >
            <source src={templateConfig.heroMedia.videoSrc} type="video/mp4" />
          </video>
          <div
            className={styles.videoOverlay}
            data-ready={videoReady ? "true" : "false"}
            aria-hidden="true"
          />
        </>
      ) : (
        <HeroFallback reducedMotion={reduceMotion} />
      )}
    </figure>
  );
}
