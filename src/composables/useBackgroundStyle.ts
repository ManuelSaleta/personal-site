import { ref } from "vue";

export type BackgroundStyle = "dots" | "grid" | "topo" | "beam" | "aurora" | "none";

export interface BackgroundOption {
  id: BackgroundStyle;
  label: string;
  icon: string;
  description: string;
}

export const backgroundOptions: BackgroundOption[] = [
  {
    id: "dots",
    label: "Dot Matrix",
    icon: "mdi-dots-grid",
    description: "Cyber hybrid micro-dots with atmospheric glow",
  },
  {
    id: "grid",
    label: "Blueprint Grid",
    icon: "mdi-grid",
    description: "Architectural wireframe with crosshairs",
  },
  {
    id: "topo",
    label: "Topographic Contours",
    icon: "mdi-chart-line-variant",
    description: "Cloud network elevation contours",
  },
  {
    id: "beam",
    label: "Spotlight Beam",
    icon: "mdi-flashlight",
    description: "Cinematic overhead conic light ray",
  },
  {
    id: "aurora",
    label: "Drifting Aurora",
    icon: "mdi-weather-sunset-up",
    description: "Living animated fluid mesh gradient",
  },
  {
    id: "none",
    label: "Minimal (None)",
    icon: "mdi-circle-off-outline",
    description: "Clean solid canvas",
  },
];

const saved =
  typeof localStorage !== "undefined"
    ? (localStorage.getItem("preferred-bg-style") as BackgroundStyle)
    : null;

const currentBackground = ref<BackgroundStyle>(
  saved && backgroundOptions.some((o) => o.id === saved) ? saved : "dots"
);

export function useBackgroundStyle() {
  function setBackgroundStyle(style: BackgroundStyle) {
    currentBackground.value = style;
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("preferred-bg-style", style);
    }
  }

  return {
    currentBackground,
    backgroundOptions,
    setBackgroundStyle,
  };
}
