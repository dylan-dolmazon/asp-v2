import { _height } from "#tailwind-config/theme";

export default {
  theme: {
    extend: {
      colors: {
        default: {
          DEFAULT: "#3c93d0",
          50: "#ebf5ff",
          100: "#cce1ff",
          200: "#99c9ff",
          300: "#66b0ff",
          400: "#3398ff",
          500: "#3c93d0", // Votre couleur par défaut
          600: "#0066cc",
          700: "#004c99",
          800: "#003366",
          900: "#001a33",
          950: "#000d19",
        },
        secondary: {
          DEFAULT: "#3380c1",
        },
        gris: {
          50: "#F6F6FA",
          100: "#F0F0F6",
          200: "#E3E4EB",
          250: "#DBDCE5",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#5F6369",
          700: "#374151",
          800: "#1f2937",
          900: "#2A2E34",
          950: "#202020",
        },
        background: {
          DEFAULT: "#f3f6ff",
          error: "hsl(5, 85%, 95%)",
          success: "hsl(120, 70%, 95%)",
          warning: "hsl(42, 100%, 95%)",
          info: "hsl(212, 100%, 95%)",
          header: "#282c32",
          settings: "#1c1e23",
          surface: "#e4e4e4",
        },
        error: "hsl(5, 85%, 50%)",
        success: "hsl(120, 70%, 40%)",
        warning: "hsl(42, 100%, 60%)",
        info: "hsl(212, 100%, 45%)",
        black: "#000",
        white: "#fff",
        gold: "#d4af37",
        logo: {
          yellow: "#e2d618",
        },
      },
      height: {
        "2xs": "24px",
        xs: "28px",
        sm: "32px",
        md: "36px",
        lg: "40px",
        xl: "44px",
      },
    },
  },
  content: [
    `components/**/*.{vue,js}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `composables/**/*.{js,ts}`,
    `plugins/**/*.{js,ts}`,
    `App.{js,ts,vue}`,
    `app.{js,ts,vue}`,
  ],
};
