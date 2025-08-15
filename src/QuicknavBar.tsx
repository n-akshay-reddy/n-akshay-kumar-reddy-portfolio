import React, { useRef } from "react";
import data from '../Data/quickbar';
import "./QuickNavBar.css";


const QuickNavBar: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
  const container = containerRef.current;
  if (!container) return;

  const imgs = container.querySelectorAll<HTMLImageElement>("img");
  const mouseX = e.clientX;

  imgs.forEach((img) => {
    const rect = img.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const distance = Math.abs(mouseX - center);

    const maxScale = 1.8;
    const minScale = 0.85;
    const scale = Math.max(minScale, maxScale - distance / 150);

    // lift the icon a bit as it grows, so it pops above the bar
    const lift = Math.max(0, (scale - 1) * 18); // px

    img.style.transform = `translateY(-${lift}px) scale(${scale})`;
    const parent = img.parentElement as HTMLElement;
    if (parent) {
      parent.style.zIndex = scale > 1.05 ? "10" : "1";
      parent.classList.toggle("is-active", scale > 1.05);
    }
  });
};

const handleMouseLeave = () => {
  const container = containerRef.current;
  if (!container) return;
  const imgs = container.querySelectorAll<HTMLImageElement>("img");
  imgs.forEach((img) => {
    img.style.transform = "translateY(0) scale(1)";
    const parent = img.parentElement as HTMLElement;
    if (parent) {
      parent.style.zIndex = "1";
      parent.classList.remove("is-active");
    }
  });
};
  return (
    <div
      className="social-bar"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {data.iconsData.map((icon, index) => (
        <a
          key={index}
          href={icon.href}
          className="icon"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={icon.img} alt={icon.alt} />
          <span className="tooltip">{icon.tooltip}</span>
        </a>
      ))}
    </div>
  );
};

export default QuickNavBar;
