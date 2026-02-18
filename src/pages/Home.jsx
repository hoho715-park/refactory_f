// src/pages/Home.jsx

import HeroSection from '../components/hero/HeroSection';
import HeroContent from '../components/hero/HeroContent';

const VIMEO_VIDEO_ID = '1165327702';

const Home = () => {
  return (
    <main>
      <HeroSection videoId={VIMEO_VIDEO_ID}>
        <HeroContent />
      </HeroSection>
    </main>
  );
};

export default Home;
