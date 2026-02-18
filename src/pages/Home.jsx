// src/pages/Home.jsx

import HeroSection from '../components/hero/HeroSection';

const VIMEO_VIDEO_ID = '1165327702';

const Home = () => {
  return (
    <main>
      <HeroSection videoId={VIMEO_VIDEO_ID}>
        {/* Hero content goes here */}
      </HeroSection>
    </main>
  );
};

export default Home;
