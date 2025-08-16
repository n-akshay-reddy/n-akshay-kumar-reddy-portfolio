// App.tsx
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AnimatedWavyCursor from "./WavyCursor";
import ThemeToggle from "./ThemeToggle";
import "./App.css";
import Leo from "./Leo/Leo";
import QuickNavBar from "./QuicknavBar";
import SignatureLogo from "./Logo";
import HomePage from "./HomePage/HomePage";
import NavBar from "./NavBar/NavBar";

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

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="App">
      <div className={`app-header ${scrolled ? "scrolled" : ""}`}>
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
          <NavBar />

          <header style={{ position: "fixed", top: "1rem", right: "1rem", zIndex: 2000 }}>
            <ThemeToggle dark={dark} setDark={setDark} />
          </header>

          {/* ROUTES */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<div>About Page</div>} />
            <Route path="/showcase" element={<div>Showcase Page</div>} />
            <Route path="/more" element={<div>More Page</div>} />
          </Routes>

          <QuickNavBar />
          <Leo />
        </>
      )}
    </div>
  );
}

export default App;
