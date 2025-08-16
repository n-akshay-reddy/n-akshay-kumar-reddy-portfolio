import React, { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";

const Chevron: React.FC<{ open: boolean }> = ({ open }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
    style={{
      transition: "transform 0.2s",
      transform: open ? "rotate(180deg)" : "rotate(0deg)",
    }}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const NavBar: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

  const handleMouseEnter = (menu: string) => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setOpenMenu(menu);
  };

  const handleMouseLeave = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
    }
    closeTimeout.current = setTimeout(() => {
      setOpenMenu(null);
    }, 200); // delay to prevent flickering
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="nav-bar">
      {/* Hamburger for mobile */}
      <button
        className={`hamburger ${mobileOpen ? "highlight" : ""}`}
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <img src="/hamburger-menu.svg" alt="Menu" />
      </button>

      {/* Navigation */}
      <ul className={`nav-list ${mobileOpen ? "open" : ""}`}>
        <li>
          <Link to="/" className={isActive("/") ? "active" : ""}>
            Home
          </Link>
        </li>

        {/* About Dropdown */}
        <li
          className={`dropdown ${openMenu === "about" ? "open" : ""}`}
          onMouseEnter={() => handleMouseEnter("about")}
          onMouseLeave={handleMouseLeave}
        >
          <button className={`drop-btn ${isActive("/about") ? "active" : ""}`}>
            <span>About</span>
            <Chevron open={openMenu === "about"} />
          </button>
          <ul className="dropdown-menu">
            <li>
              <Link to="/about#education">Education</Link>
            </li>
            <li>
              <Link to="/about#skills">Skills</Link>
            </li>
          </ul>
        </li>

        {/* Showcase Dropdown */}
        <li
          className={`dropdown ${openMenu === "showcase" ? "open" : ""}`}
          onMouseEnter={() => handleMouseEnter("showcase")}
          onMouseLeave={handleMouseLeave}
        >
          <button className={`drop-btn ${isActive("/showcase") ? "active" : ""}`}>
            <span>Showcase</span>
            <Chevron open={openMenu === "showcase"} />
          </button>
          <ul className="dropdown-menu">
            <li>
              <Link to="/showcase#projects">Projects</Link>
            </li>
            <li>
              <Link to="/showcase#work">Work</Link>
            </li>
            <li>
              <Link to="/showcase#achievements">Achievements</Link>
            </li>
          </ul>
        </li>

        {/* More Dropdown */}
        <li
          className={`dropdown ${openMenu === "more" ? "open" : ""}`}
          onMouseEnter={() => handleMouseEnter("more")}
          onMouseLeave={handleMouseLeave}
        >
          <button className={`drop-btn ${isActive("/more") ? "active" : ""}`}>
            <span>More</span>
            <Chevron open={openMenu === "more"} />
          </button>
          <ul className="dropdown-menu">
            <li>
              <Link to="/more#interests">Interests</Link>
            </li>
            <li>
              <Link to="/more#hobbies">Hobbies</Link>
            </li>
            <li>
              <Link to="/more#contact">Contact</Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
