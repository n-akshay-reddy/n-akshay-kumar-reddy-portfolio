import { useState, useEffect } from "react";
import AnimatedWavyCursor from "./WavyCursor";
import ThemeToggle from "./ThemeToggle";
import "./App.css";
import Leo from "./Leo/Leo";
import QuickNavBar from "./QuicknavBar";
import SignatureLogo from "./Logo";
import HomePage from "./HomePage/HomePage";

function App() {
  const [dark, setDark] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 2800); 
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, [dark]);

  // Scroll detection for header shadow
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="App">
      {/* Navigation bar overlay */}
      <div className={`app-header ${scrolled ? "scrolled" : ""}`}>
        {/* Logo stays fixed, positioned inside nav visually */}
        <SignatureLogo />
      </div>

      {!showContent && (
        <div className="intro-screen">
          <img src="ghost.gif" alt="ghost" className="intro-gif" />
        </div>
      )}

      {showContent && (
        <>
          <AnimatedWavyCursor />
          {/* Theme toggle fixed at top right */}
          <header style={{ position: "fixed", top: "1rem", right: "1rem", zIndex: 2000 }}>
            <ThemeToggle dark={dark} setDark={setDark} />
          </header>
          <HomePage />
          <QuickNavBar />
          <Leo />
        </>
      )}
    </div>
  );
}

export default App;
