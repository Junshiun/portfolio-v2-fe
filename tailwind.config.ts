import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      zIndex: {
        negative: "-1",
        "negative-10": "-10",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "yellow-01": "#FFBF00",
        "yellow-02": "#FFDF81",
        "yellow-03": "#faeeca",
        "white-01": "#e8e8e8",
        "white-02": "#f5f5f7",
        "grey-01": "#8c8c8c",
        "grey-02": "#2f2e36",
        "blue-01": "#023047",
      },
      fontSize: {
        sm: "12px",
        md: "14px",
        l: "16px",
      },
    },
  },
  plugins: [
    function (props: {
      addBase: (styles: Record<string, any>) => void;
      theme: (path: string) => any;
    }) {
      props.addBase({
        ":root": {
          "--white-01": props.theme("colors.white-01"),
        },
      });
    },
  ],
  future: {
    hoverOnlyWhenSupported: true, // Enable hover only when supported
  },
};
export default config;
