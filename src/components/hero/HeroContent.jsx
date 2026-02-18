// src/components/hero/HeroContent.jsx

import { useNavigate } from 'react-router-dom';
import './heroContent.css';

const defaultContent = {
  title: 'RE:FACTORY',
  subtitle: 'Analyze. Visualize. Refactor.',
  description: ['코드를 해부하고', '구조를 시각화하고', '더 나은 형태로 다시 설계합니다.'],
  buttonText: '코드 진단하기',
  buttonLink: '/code-insight',
};

const HeroContent = ({
  title = defaultContent.title,
  subtitle = defaultContent.subtitle,
  description = defaultContent.description,
  buttonText = defaultContent.buttonText,
  buttonLink = defaultContent.buttonLink,
}) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(buttonLink);
  };

  return (
    <div className="hero-text-content">
      <h1 className="hero-title">{title}</h1>
      <p className="hero-subtitle">{subtitle}</p>
      <div className="hero-description">
        {description.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
      <button className="hero-button" onClick={handleButtonClick}>
        {buttonText}
      </button>
    </div>
  );
};

export default HeroContent;
