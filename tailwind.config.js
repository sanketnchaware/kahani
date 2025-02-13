/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
      "3xl": "1920px",
    },
    extend: {
      fontFamily: {
        Onest: ["Onest"],
        libre: ["Libre Baskerville"],
        PlusJakartaSans: ["Plus Jakarta Sans"],
      },
      colors: {
        nero: "#232323",
        floaralWhite: "#FBF8F3",
        AliceBlue: "#F2F8FF",
        AntiFlashWhite: "#F0F0F0",
        navbarbgclr: "rgba(255, 255, 255, 0.20)",
        SedonaSage: "#676c6c",
        CandyAppleRed: "#DE0536",
        DimGray: "#676979",
        LavendarGreay: "#C4C6D1",
        DarkGunmetal: "#23242C",
        FaintDarkGunmetal: "rgba(35, 36, 44, 0.4)",
        Sidebar: "rgba(255, 255, 255, 0.4)",
        GOGreen: "#00BA6C",
        OutrageousOrange: "#FF6D4D",
        DarkLiver: "#4F4F4F",
        Nickel: "#727272",
        LightSlateGray: "#7C7C7C",
        Charcoal: "#232323",
        reddishBrown: "#723B33",
        pinkishorange: "#F39D8F",
        RussetBrown: "#88514A",
        Turquoise: "#348F86",
        Cyan: "#7AE9E4",
        darkteal: "#3E7171",
        DeepCyan: "#2B504C",
        MidnightTeal: "#182B2B",
        ElectricBlue: "#2886FF",
        blueDress: "#287AE6",
        ShadowedSteel: "#4b4b4b",
        Onyx: "#111212",

        // new
        HanBlue: "#5565CD",
        CandyApple: "#2D478B",
        dazzling_blue: "#3A47A0",
        noble_black: "#212125",
        wolfram: "#B3B4B7",
        grass_green: "#3BA013",
        cossack_green: "#30870E",
        fade_shire_green: "rgba(103, 221, 56, 0.1)",
        shire_green: "rgba(103, 221, 56, 1)",
        flint_purple: "#42434B",
        Neutral0: "#F7F7F7",
        dark_void: "#141416",
        pale_night_green: "#B3F998",
        metalise: "#35363C",
        tarnished_silver: "#7B7B81",
        oasis_sand: "#FDEDC5",
        muddy_brown: "#87650E",
        tidal_pool: "#005B5A",
        silverGray: "#F6F6F6",
        PowderAsh: "#C0C8C8",
      },

      boxShadow: {
        sameshadow: "0px 2px 8px 1px rgba(0, 0, 0, 0.1)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        transparentFrameDesktop:
          "url('/images/home/transparentFrameDesktop.webp')",
        plusPattern: "url('/gradients/plus-pattern.webp')",
        tilted_bottle: "url('/images/about-us/tilted_bottle.webp')",
        gradient_hero: "url('/gradients/gradient-desktop.webp')",
      },
    },
  },
  plugins: [],
};
