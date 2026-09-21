/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

export default createVuetify({
  theme: {
    defaultTheme: "dark",
    themes: {
      light: {
        dark: false,
        colors: {
          primary: "#1a73e8",
          secondary: "#5f6368",
          background: "#f8fafc",
          surface: "#ffffff",
          "surface-variant": "#f1f5f9",
          "on-surface": "#0f172a",
          "on-background": "#0f172a",
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: "#8ab4f8",
          secondary: "#94a3b8",
          background: "#0d1117",
          surface: "#161b22",
          "surface-variant": "#21262d",
          "on-surface": "#f0f6fc",
          "on-background": "#f0f6fc",
        },
      },
    },
  },
});
