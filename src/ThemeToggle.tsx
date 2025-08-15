import React, { useState } from "react";
import "./ThemeToggle.css";

interface ThemeToggleProps {
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ dark, setDark }) => {
  const [spinning, setSpinning] = useState<boolean>(false);

  const handleClick = () => {
    setSpinning(true);

    // Switch theme after a short fast spin
    setTimeout(() => {
      setDark((prev) => !prev);
    }, 300);

    // Stop spin after animation
    setTimeout(() => {
      setSpinning(false);
    }, 800);
  };

  return (
    <button
      className="theme-toggle-btn"
      onClick={handleClick}
      aria-label="Toggle theme"
    >
      <img
        src={dark ? "theme/sun.svg" : "theme/moon.svg"}
        alt={dark ? "sun image" : "moon image"}
        className={`theme-icon ${spinning ? "spin-back" : ""}`}
      />
    </button>
  );
};

export default ThemeToggle;
