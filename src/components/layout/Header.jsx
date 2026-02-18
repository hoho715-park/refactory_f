// src/components/layout/Header.jsx

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/LOGO.png';
import HamburgerButton from './HamburgerButton';
import './header.css';

const menuItems = [
  { label: 'About Us', path: '/about' },
  { label: 'Code Insight', path: '/code-insight' },
  {
    label: 'More',
    path: null,
    dropdown: [
      { label: 'Sub Menu 1', path: '/more/sub1' },
      { label: 'Sub Menu 2', path: '/more/sub2' },
      { label: 'Sub Menu 3', path: '/more/sub3' },
    ],
  },
];

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleDropdownClose = () => {
    setDropdownOpen(false);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen((prev) => !prev);
    if (mobileMenuOpen) {
      setMobileDropdownOpen(false);
    }
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
    setMobileDropdownOpen(false);
  };

  const handleMobileDropdownToggle = () => {
    setMobileDropdownOpen((prev) => !prev);
  };

  return (
    <header className="header">
      <div className="header-container">
        <NavLink to="/" className="header-logo" onClick={handleMobileMenuClose}>
          <img src={logo} alt="RE:FACTORY Logo" />
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="header-nav desktop-nav">
          <ul className="nav-menu">
            {menuItems.map((item) =>
              item.dropdown ? (
                <li
                  key={item.label}
                  className="nav-item has-dropdown"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={handleDropdownClose}
                >
                  <button
                    className={`nav-link dropdown-toggle ${dropdownOpen ? 'active' : ''}`}
                    onClick={handleDropdownToggle}
                  >
                    {item.label}
                    <span className="dropdown-arrow">▼</span>
                  </button>
                  {dropdownOpen && (
                    <ul className="dropdown-menu">
                      <div className="dropdown-menu-inner">
                        {item.dropdown.map((subItem) => (
                          <li key={subItem.path}>
                            <NavLink
                              to={subItem.path}
                              className={({ isActive }) =>
                                `dropdown-link ${isActive ? 'active' : ''}`
                              }
                              onClick={handleDropdownClose}
                            >
                              {subItem.label}
                            </NavLink>
                          </li>
                        ))}
                      </div>
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.path} className="nav-item">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `nav-link ${isActive ? 'active' : ''}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              )
            )}
            <li className="nav-item">
              <NavLink to="/login" className="nav-link login-btn">
                LOGIN
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Mobile Hamburger Button */}
        <HamburgerButton isOpen={mobileMenuOpen} onClick={handleMobileMenuToggle} />
      </div>

      {/* Mobile Navigation */}
      <nav className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-menu">
          {menuItems.map((item) =>
            item.dropdown ? (
              <li key={item.label} className="mobile-nav-item has-dropdown">
                <button
                  className={`mobile-nav-link mobile-dropdown-toggle ${mobileDropdownOpen ? 'active' : ''}`}
                  onClick={handleMobileDropdownToggle}
                >
                  {item.label}
                  <span className="dropdown-arrow">▼</span>
                </button>
                <ul className={`mobile-dropdown-menu ${mobileDropdownOpen ? 'open' : ''}`}>
                  {item.dropdown.map((subItem) => (
                    <li key={subItem.path}>
                      <NavLink
                        to={subItem.path}
                        className={({ isActive }) =>
                          `mobile-dropdown-link ${isActive ? 'active' : ''}`
                        }
                        onClick={handleMobileMenuClose}
                      >
                        {subItem.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={item.path} className="mobile-nav-item">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `mobile-nav-link ${isActive ? 'active' : ''}`
                  }
                  onClick={handleMobileMenuClose}
                >
                  {item.label}
                </NavLink>
              </li>
            )
          )}
          <li className="mobile-nav-item">
            <NavLink
              to="/login"
              className="mobile-nav-link mobile-login-btn"
              onClick={handleMobileMenuClose}
            >
              LOGIN
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
