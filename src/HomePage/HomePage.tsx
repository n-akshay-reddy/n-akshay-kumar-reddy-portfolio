import React, { useState, useEffect } from 'react';
import './HomePage.css';

const HomePage: React.FC = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const roles = [
    "Full Stack Developer",
    "Software Engineer",
    "MERN Stack Developer",
    "Frontend Developer",
    "Backend Developer"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setIsVisible(true);
      }, 500);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="homepage-wrapper">
      <div className="homepage-container">
        {/* LEFT SIDE */}
        <div className="left-section">
          <p className="intro-text">
            Hi! I'm <span className="name-highlight">N Akshay Kumar Reddy</span>
          </p>

          <h1 className="headline">
            <span>I build</span>
            <span className="gradient-text"> innovative </span>
            <span>applications that</span>
            <span>solve <span className="highlight">problems</span></span>
          </h1>

          <div className="animated-role">
            <div className={`role-text ${isVisible ? 'visible' : 'hidden'}`}>
              <span className="gradient-text">{roles[currentRole]}</span>
              {isVisible && <span className="blinking-bar" />}
            </div>
          </div>

          <p className="description">
            An enthusiastic developer who specializes in crafting robust, user-centric web applications
            with cutting-edge technologies and clean, maintainable code architecture.
          </p>

          <div className="cta-buttons">
            <button className="connect-btn">Skills</button>
            <button className="resume-btn">Download Resume →</button>
          </div>
        </div>

        {/* RIGHT SIDE DECORATIVE */}
        <div className="right-section">
          <div className="circle-container">
            <div className="circle pulse one"></div>
            <div className="circle ping two"></div>
            <div className="circle float three"></div>

            <div className="center-circle rotate">
              <div className="circle-content">
                <div className="logo-circle">
                  <span className="logo-initials">AK</span>
                </div>
                <p className="logo-subtext">Building Digital</p>
                <p className="logo-subtext">Innovation</p>
              </div>
            </div>

            <div className="floating yellow"></div>
            <div className="floating green"></div>
            <div className="floating blue"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
