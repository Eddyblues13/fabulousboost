export const THEME_COLORS = {
  // Primary colors - purple/pink theme
  primary: {
    50: "bg-purple-50",
    100: "bg-purple-100",
    200: "bg-purple-200",
    500: "bg-purple-500",
    600: "bg-purple-600",
    700: "bg-purple-700",
    800: "bg-purple-800",
  },
  // Text colors
  text: {
    primary50: "text-purple-50",
    primary100: "text-purple-100",
    primary200: "text-purple-200",
    primary600: "text-purple-600",
    primary700: "text-purple-700",
    
  },
  // Border colors
  border: {
    primary200: "border-purple-200",
    primary500: "border-purple-500",
  },
  // Hover colors
  hover: {
    primary100: "hover:bg-purple-100",
    primary500: "hover:bg-purple-500",
    primary700: "hover:bg-purple-700",
  },
  // Background colors
  background: {
    primary: "bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50",
    secondary: "bg-gradient-to-r from-purple-50 to-pink-50",
    card: "bg-white",
    muted: "bg-gray-50",
    accent: "bg-purple-50",
  },
}

// CSS custom properties for dynamic colors
export const CSS_COLORS = {
  primary: "#a855f7",          // purple-500
  primaryDark: "#7e22ce",      // purple-800
  primaryLight: "#c084fc",     // purple-300
  primaryVeryLight: "#f3e8ff", // purple-100
  primaryExtraLight: "#faf5ff",// purple-50

  // Background colors
  background: {
    primary: "linear-gradient(135deg, #faf5ff 0%, #fdf2f8 50%, #faf5ff 100%)", // purple-50 to pink-50 to purple-50
    secondary: "linear-gradient(90deg, #faf5ff 0%, #fdf2f8 100%)", // purple-50 to pink-50
    card: "#ffffff",           // white card
    muted: "#f9fafb",          // gray-50
    accent: "#faf5ff",         // purple-50
    overlay: "rgba(168, 85, 247, 0.05)", // purple-500 with 5% opacity
    sidebar: "linear-gradient(135deg, #9333ea 0%, #a855f7 50%, #c084fc 100%)",
    activeSidebar: "linear-gradient(135deg, #6b21a8 0%, #7e22ce 40%, #9333ea 100%)",

  },



}
