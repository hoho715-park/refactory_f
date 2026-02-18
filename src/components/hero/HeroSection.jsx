// src/components/hero/HeroSection.jsx

import BackgroundVideo from './BackgroundVideo';
import './hero.css';

const HeroSection = ({ videoId, children }) => {
  return (
    <section className="hero-section">
      <BackgroundVideo videoId={videoId} />
      <div className="hero-overlay" />
      <div className="hero-content">
        {children}
      </div>
    </section>
  );
};

export default HeroSection;
