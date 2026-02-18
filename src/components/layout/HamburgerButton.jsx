// src/components/layout/HamburgerButton.jsx

const HamburgerButton = ({ isOpen, onClick }) => {
  return (
    <button
      className={`hamburger-button ${isOpen ? 'open' : ''}`}
      onClick={onClick}
      aria-label="Toggle menu"
    >
      <span className="hamburger-line" />
      <span className="hamburger-line" />
      <span className="hamburger-line" />
    </button>
  );
};

export default HamburgerButton;
