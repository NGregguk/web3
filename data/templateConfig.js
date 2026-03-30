export const templateConfig = {
  metadata: {
    title: "Citizen Eco-Drive | Quiet Dress Watch",
    description:
      "A clean watch landing page template with hero film, interactive 3D viewing, and product-focused storytelling."
  },
  themeStorageKey: "editorial-watch-template-theme",
  brand: {
    name: "Citizen",
    subline: "Eco-Drive",
    fullName: "Citizen Eco-Drive",
    homeAriaLabel: "Citizen Eco-Drive home"
  },
  heroMedia: {
    videoSrc: "/videos/hero-video/watch-turning.mp4",
    figcaption:
      "Looping hero product film. Motion is disabled when reduced-motion is preferred or the video fails to load."
  },
  productViewer: {
    figcaption:
      "3D watch study. When the interactive view is available, drag to rotate the object or use the arrow keys while the canvas is focused.",
    ariaLabel:
      "Interactive 3D watch study. Drag to rotate the object. Use arrow keys when focused.",
    initialRotation: { x: 0.68, y: -0.3 },
    pitchLimits: { min: -1.5, max: 1.3 },
    drag: {
      horizontalPerPixel: 0.012,
      verticalPerPixel: 0.014,
      keyStep: 0.12,
      keyStepFast: 0.22,
      easing: {
        default: 10,
        lowPower: 8
      }
    },
    camera: {
      fov: 31,
      position: [0, 0.22, 5.34]
    },
    lighting: {
      ambient: 0.96,
      key: { position: [3.4, 3.8, 4.8], intensity: 1.48 },
      fill: { position: [-3.1, 0.9, 3.1], intensity: 0.58 },
      top: { position: [0, 2.6, 2.2], intensity: 0.24 },
      face: { position: [0.3, 1.1, 3.8], intensity: 0.18 }
    },
    model: {
      src: "/models/citizen-watch/source/SAAT NeeEDA.glb",
      position: [0.08, -0.18, 0],
      rotation: [0.12, Math.PI, -0.13],
      scale: {
        default: 3.15,
        lowPower: 2.8
      },
      material: {
        envMapIntensity: 0.85,
        minRoughness: 0.2,
        maxMetalness: 0.92
      }
    }
  }
};
